/**
 * Can I Pet That Dawg — Mileage Tracker
 * Container-bound Apps Script for the "Pet Sitting Mileage" Google Sheet.
 *
 * How it works:
 *  - iPhone Shortcut hits the web app URL with ?action=start&lat=..&lng=..
 *    → logs an OPEN trip row (date, time, reverse-geocoded start address).
 *  - Shortcut hits ?action=end&lat=..&lng=..
 *    → closes the most recent OPEN trip, asks Google Maps for the driving
 *      route + distance, writes miles and route summary.
 *  - A time-driven trigger fires at 11pm nightly and writes the day's
 *    trip count + total miles + deduction into "Daily Totals".
 *
 * One-time setup: run setup() once from the editor (creates tabs + trigger),
 * then Deploy → New deployment → Web app (execute as Me, access: Anyone).
 */

// ── Config ──────────────────────────────────────────────────────────────
const SECRET = 'PICK-YOUR-OWN-SECRET';   // set your own random string; must match the token in your Shortcuts
const TRIPS_SHEET = 'Trips';
const TOTALS_SHEET = 'Daily Totals';
const IRS_RATE = 0.70;                    // $/mile — update each tax year

// Trips columns: A Date | B Start | C End | D Start Address | E End Address
//                F Route | G Miles | H Status | I StartLat | J StartLng
const COL = { DATE: 1, START: 2, END: 3, START_ADDR: 4, END_ADDR: 5,
              ROUTE: 6, MILES: 7, STATUS: 8, LAT: 9, LNG: 10 };

// ── Web app entry point ─────────────────────────────────────────────────
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.token !== SECRET) return textOut('⛔ Wrong or missing token.');

  const lat = Number(p.lat), lng = Number(p.lng);
  if (!isFinite(lat) || !isFinite(lng)) {
    return textOut('⛔ Missing location. Check the Shortcut passes Latitude/Longitude.');
  }

  if (p.action === 'start') return textOut(startTrip(lat, lng));
  if (p.action === 'end') return textOut(endTrip(lat, lng));
  return textOut('⛔ Unknown action — use start or end.');
}

function textOut(msg) {
  return ContentService.createTextOutput(msg);
}

// ── Trip logic ──────────────────────────────────────────────────────────
function startTrip(lat, lng) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(TRIPS_SHEET);
  const tz = ss.getSpreadsheetTimeZone();
  const now = new Date();
  const address = addressFor(lat, lng);

  sheet.appendRow([
    Utilities.formatDate(now, tz, 'yyyy-MM-dd'),
    Utilities.formatDate(now, tz, 'h:mm a'),
    '', address, '', '', '', 'OPEN', lat, lng,
  ]);

  return '🐾 Trip started from ' + address + ' at ' +
         Utilities.formatDate(now, tz, 'h:mm a') + '. Drive safe!';
}

function endTrip(lat, lng) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(TRIPS_SHEET);
  const tz = ss.getSpreadsheetTimeZone();
  const now = new Date();
  const rows = sheet.getDataRange().getValues();

  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][COL.STATUS - 1] !== 'OPEN') continue;

    const startLat = Number(rows[i][COL.LAT - 1]);
    const startLng = Number(rows[i][COL.LNG - 1]);
    const endAddress = addressFor(lat, lng);
    const trip = drivingDistance(startLat, startLng, lat, lng);
    const row = i + 1;

    sheet.getRange(row, COL.END).setValue(Utilities.formatDate(now, tz, 'h:mm a'));
    sheet.getRange(row, COL.END_ADDR).setValue(endAddress);
    sheet.getRange(row, COL.ROUTE).setValue(trip.route);
    sheet.getRange(row, COL.MILES).setValue(trip.miles);
    sheet.getRange(row, COL.STATUS).setValue('DONE');

    return '✅ Logged ' + trip.miles + ' mi (' + trip.route + ') → ' + endAddress;
  }

  return '🤔 No open trip found — did you tap Start Trip first?';
}

/** Driving distance + route summary via Google Maps; straight-line fallback. */
function drivingDistance(lat1, lng1, lat2, lng2) {
  try {
    const d = Maps.newDirectionFinder()
      .setOrigin(lat1 + ',' + lng1)
      .setDestination(lat2 + ',' + lng2)
      .setMode(Maps.DirectionFinder.Mode.DRIVING)
      .getDirections();
    if (d.routes && d.routes.length) {
      const route = d.routes[0];
      let meters = 0;
      route.legs.forEach(function (leg) { meters += leg.distance.value; });
      return {
        miles: Math.round((meters / 1609.344) * 10) / 10,
        route: route.summary || 'via local roads',
      };
    }
  } catch (err) {
    // fall through to straight-line estimate
  }
  return {
    miles: Math.round(haversineMiles(lat1, lng1, lat2, lng2) * 10) / 10,
    route: 'straight-line estimate',
  };
}

function haversineMiles(lat1, lng1, lat2, lng2) {
  const R = 3958.76;
  const toRad = function (d) { return d * Math.PI / 180; };
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/** Reverse-geocode coordinates to a street address; falls back to raw coords. */
function addressFor(lat, lng) {
  try {
    const r = Maps.newGeocoder().reverseGeocode(lat, lng);
    if (r.results && r.results.length) {
      // strip ", USA" to keep cells compact
      return r.results[0].formatted_address.replace(/, USA$/, '');
    }
  } catch (err) { /* fall through */ }
  return lat.toFixed(5) + ', ' + lng.toFixed(5);
}

// ── Nightly 11pm rollup ─────────────────────────────────────────────────
function logDailyTotal() {
  const ss = SpreadsheetApp.getActive();
  const trips = ss.getSheetByName(TRIPS_SHEET);
  const totals = ss.getSheetByName(TOTALS_SHEET);
  const tz = ss.getSpreadsheetTimeZone();
  const today = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  const rows = trips.getDataRange().getValues();

  let miles = 0, count = 0;
  for (let i = 1; i < rows.length; i++) {
    if (dateKey(rows[i][COL.DATE - 1], tz) !== today) continue;
    if (rows[i][COL.STATUS - 1] === 'OPEN') {
      // trip was never ended — flag it so it's easy to fix by hand
      trips.getRange(i + 1, COL.STATUS).setValue('INCOMPLETE');
      continue;
    }
    miles += Number(rows[i][COL.MILES - 1]) || 0;
    count++;
  }

  if (count === 0) return; // no trips today, no row
  miles = Math.round(miles * 10) / 10;
  totals.appendRow([today, count, miles, Math.round(miles * IRS_RATE * 100) / 100]);
}

/** Sheets may hand dates back as Date objects or strings — normalize both. */
function dateKey(value, tz) {
  if (value instanceof Date) return Utilities.formatDate(value, tz, 'yyyy-MM-dd');
  return String(value);
}

// ── Brand theme: Can I Pet That Dawg ────────────────────────────────────
// Run applyTheme() once (and again anytime you want to re-apply it).
const BRAND = {
  creme:    '#F4EFE6',  // --bg
  blueTint: '#E3EBF1',  // light wash of --blue for row stripes
  charcoal: '#2A2520',  // --charcoal text
  brown:    '#1E1A15',  // --hero-bg
  polaroid: '#3A2F24',  // warm brown, used for INCOMPLETE
  orange:   '#C4892A',  // --orange
  green:    '#4A7C5E',  // --green
  blue:     '#3A6B8A',  // --blue
  headFont: 'IBM Plex Mono',
  bodyFont: 'Space Mono',
};

function applyTheme() {
  const ss = SpreadsheetApp.getActive();
  themeTrips(ss.getSheetByName(TRIPS_SHEET));
  themeTotals(ss.getSheetByName(TOTALS_SHEET));
}

function themeTrips(sheet) {
  const HEADERS = ['📅 Date', '🕐 Start', '🏁 End', '📍 From', '🎯 To',
                   '🗺️ Route', '🚗 Miles', '✅ Status', 'StartLat', 'StartLng'];
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  styleTable(sheet, 8, BRAND.brown);
  sheet.setTabColor(BRAND.blue);

  sheet.setColumnWidth(COL.DATE, 105);
  sheet.setColumnWidths(COL.START, 2, 90);
  sheet.setColumnWidths(COL.START_ADDR, 2, 230);
  sheet.setColumnWidth(COL.ROUTE, 150);
  sheet.setColumnWidth(COL.MILES, 80);
  sheet.setColumnWidth(COL.STATUS, 130);

  const rows = sheet.getMaxRows() - 1;
  sheet.getRange(2, COL.START, rows, 2).setHorizontalAlignment('center');
  sheet.getRange(2, COL.MILES, rows, 1)
    .setFontColor(BRAND.orange).setFontWeight('bold')
    .setNumberFormat('0.0').setHorizontalAlignment('center');

  const status = sheet.getRange(2, COL.STATUS, rows, 1);
  status.setHorizontalAlignment('center');
  sheet.setConditionalFormatRules([
    statusRule(status, 'DONE', BRAND.green),
    statusRule(status, 'OPEN', BRAND.orange),
    statusRule(status, 'INCOMPLETE', BRAND.polaroid),
  ]);
}

function themeTotals(sheet) {
  const HEADERS = ['📅 Date', '🐾 Trips', '🚗 Total Miles', '💰 Deduction'];
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  styleTable(sheet, 4, BRAND.green);
  sheet.setTabColor(BRAND.green);

  sheet.setColumnWidth(1, 105);
  sheet.setColumnWidth(2, 90);
  sheet.setColumnWidths(3, 2, 130);

  const rows = sheet.getMaxRows() - 1;
  sheet.getRange(2, 2, rows, 3).setHorizontalAlignment('center');
  sheet.getRange(2, 2, rows, 1).setNumberFormat('0');
  sheet.getRange(2, 3, rows, 1)
    .setFontColor(BRAND.orange).setFontWeight('bold').setNumberFormat('0.0');
  sheet.getRange(2, 4, rows, 1)
    .setFontColor(BRAND.green).setFontWeight('bold').setNumberFormat('$#,##0.00');
}

/** Shared table chrome: fonts, header bar, creme/blue row stripes. */
function styleTable(sheet, numCols, headerBg) {
  const maxRows = sheet.getMaxRows();
  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(1);

  sheet.getRange(1, 1, maxRows, numCols)
    .setFontFamily(BRAND.bodyFont).setFontSize(12)
    .setFontColor(BRAND.charcoal).setVerticalAlignment('middle');

  sheet.getRange(1, 1, 1, numCols)
    .setBackground(headerBg).setFontColor(BRAND.creme)
    .setFontFamily(BRAND.headFont).setFontWeight('bold').setFontSize(12);
  sheet.setRowHeight(1, 38);

  sheet.getBandings().forEach(function (b) { b.remove(); });
  sheet.getRange(2, 1, maxRows - 1, numCols).applyRowBanding()
    .setFirstRowColor(BRAND.creme)
    .setSecondRowColor(BRAND.blueTint);
}

function statusRule(range, text, color) {
  return SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo(text)
    .setFontColor(color).setBold(true)
    .setRanges([range])
    .build();
}

// ── One-time setup: run this once from the editor ───────────────────────
function setup() {
  const ss = SpreadsheetApp.getActive();

  let trips = ss.getSheetByName(TRIPS_SHEET);
  if (!trips) {
    trips = ss.insertSheet(TRIPS_SHEET);
    trips.appendRow(['Date', 'Start Time', 'End Time', 'Start Address',
      'End Address', 'Route', 'Miles', 'Status', 'StartLat', 'StartLng']);
    trips.setFrozenRows(1);
    trips.hideColumns(COL.LAT, 2); // stash coordinates out of sight
  }

  let totals = ss.getSheetByName(TOTALS_SHEET);
  if (!totals) {
    totals = ss.insertSheet(TOTALS_SHEET);
    totals.appendRow(['Date', 'Trips', 'Total Miles', 'Deduction ($)']);
    totals.setFrozenRows(1);
  }

  // recreate the 11pm trigger cleanly
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'logDailyTotal') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('logDailyTotal').timeBased().atHour(23).everyDays(1).create();
}
