#!/usr/bin/env python3
"""
Generates the 'Missing a Pet Sitter' flyer at 300 DPI.
PIL renders the full canvas so print services measure 300 DPI correctly.
"""

from PIL import Image, ImageDraw, ImageFont
import qrcode, os

# ── Resolution & canvas ───────────────────────────────────────────────────────
DPI   = 300
W_PX  = int(8.5 * DPI)   # 2550
H_PX  = int(11  * DPI)   # 3300
S     = DPI / 72          # scale: 1 ReportLab pt → S pixels ≈ 4.1667

# ── Brand colors ──────────────────────────────────────────────────────────────
BG       = (244, 239, 230)
CHARCOAL = ( 42,  37,  32)
ORANGE   = (196, 137,  42)
GREEN    = ( 74, 124,  94)
PANEL    = (235, 229, 216)

# ── Paths ─────────────────────────────────────────────────────────────────────
ASSETS      = '/Users/cs/canipetthatdawg/src/assets'
PUBLIC      = '/Users/cs/canipetthatdawg/public'
PHOTO_PATH  = os.path.join(ASSETS, 'PP Kira Cute Down.JPEG')
FF_LOGO     = os.path.join(PUBLIC, 'fearfree.png')
PSI_LOGO    = os.path.join(ASSETS, 'PSI Logo.png')
PSA_LOGO    = os.path.join(ASSETS, 'PSA.png')
OUTPUT_PATH = os.path.join(PUBLIC, 'missing flyer.pdf')

WEBSITE_URL = 'https://canipetthatdawg.co'
BOOK_URL    = 'https://www.timetopet.com/portal/create/create-account'
INSTAGRAM   = '@canipet_that_dawg_llc'

# ── Font helpers ──────────────────────────────────────────────────────────────
FONT_DIRS = [os.path.expanduser('~/Library/Fonts'), '/Library/Fonts']

FONT_CANDIDATES = {
    True:  ['IBMPlexMono-Bold.ttf', 'SpaceMono-Bold.ttf', 'CourierNewBold.ttf', 'Courier New Bold.ttf'],
    False: ['IBMPlexMono-Regular.ttf', 'SpaceMono-Regular.ttf', 'CourierNew.ttf', 'Courier New.ttf'],
}

def find_font_path(name):
    for d in FONT_DIRS:
        p = os.path.join(d, name)
        if os.path.exists(p):
            return p
    return None

_font_cache = {}
def font(size_pts, bold=False):
    key = (size_pts, bold)
    if key in _font_cache:
        return _font_cache[key]
    px_size = max(1, int(size_pts * S))
    for name in FONT_CANDIDATES[bold]:
        path = find_font_path(name)
        if path:
            try:
                f = ImageFont.truetype(path, px_size)
                _font_cache[key] = f
                return f
            except Exception:
                pass
    f = ImageFont.load_default()
    _font_cache[key] = f
    return f

# ── Drawing helpers ───────────────────────────────────────────────────────────
# Coordinate system: ReportLab-style (origin bottom-left, y up).
# All rl_ values are in points; multiply by S to get pixels.
# PIL y is flipped: pil_y = H_PX - int(rl_y * S)

def px(pts):      return int(pts * S)
def pil_y(rl_y):  return H_PX - int(rl_y * S)

def rect(draw, rl_x, rl_y, rl_w, rl_h, fill=None, outline=None, width=1):
    x0, y0 = int(rl_x * S),           H_PX - int((rl_y + rl_h) * S)
    x1, y1 = int((rl_x + rl_w) * S),  H_PX - int(rl_y * S)
    draw.rectangle([x0, y0, x1, y1], fill=fill, outline=outline, width=width)

def hline(draw, rl_x0, rl_y, rl_x1, fill, width_pts=1):
    y = pil_y(rl_y)
    draw.line([(int(rl_x0*S), y), (int(rl_x1*S), y)], fill=fill, width=max(1, px(width_pts)))

def text_w(fnt, txt):
    bb = fnt.getbbox(txt)
    return bb[2] - bb[0]

def draw_centered(draw, rl_cx, rl_baseline, txt, fnt, fill):
    """Draw text centered at rl_cx, with baseline at rl_baseline."""
    bb      = fnt.getbbox(txt)
    tw      = bb[2] - bb[0]
    ascent  = -bb[1]
    x       = int(rl_cx * S) - tw // 2
    y       = pil_y(rl_baseline) - ascent
    draw.text((x, y), txt, fill=fill, font=fnt)

def draw_left(draw, rl_x, rl_baseline, txt, fnt, fill):
    bb     = fnt.getbbox(txt)
    ascent = -bb[1]
    draw.text((int(rl_x * S), pil_y(rl_baseline) - ascent), txt, fill=fill, font=fnt)

def paste_image(canvas, img_path, rl_x, rl_y_top, rl_w, rl_h, transparent=False):
    """Paste a raster image. rl_y_top is the RL y of the image's top edge."""
    src = Image.open(img_path)
    w_px, h_px = px(rl_w), px(rl_h)
    src = src.resize((w_px, h_px), Image.LANCZOS)
    x   = int(rl_x * S)
    y   = H_PX - int(rl_y_top * S)   # PIL top = H_PX - RL_top
    if transparent and src.mode == 'RGBA':
        canvas.paste(src, (x, y), src)
    else:
        src = src.convert('RGB')
        canvas.paste(src, (x, y))
    return src

def make_qr(url, size_px):
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_M,
                       box_size=14, border=2)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color='#2A2520', back_color='#F4EFE6').convert('RGB')
    return img.resize((size_px, size_px), Image.LANCZOS)

# ── Build canvas ──────────────────────────────────────────────────────────────
canvas = Image.new('RGB', (W_PX, H_PX), BG)
draw   = ImageDraw.Draw(canvas)

M  = 22    # margin (pts)
CX = 306   # center x (pts)

# Borders
rect(draw, M,   M,   612-2*M,     792-2*M,     outline=CHARCOAL, width=px(5))
rect(draw, M+7, M+7, 612-2*(M+7), 792-2*(M+7), outline=CHARCOAL, width=px(2))

# ── MISSING ───────────────────────────────────────────────────────────────────
HEADER_Y  = 714   # baseline (RL pts)
fMissing  = font(72, bold=True)

draw_centered(draw, CX, HEADER_Y, 'MISSING', fMissing, ORANGE)

# Stars — same baseline, green
mw = text_w(fMissing, 'MISSING')
sw = text_w(fMissing, '★')
GAP = px(18)
bb_star = fMissing.getbbox('★')
star_asc = -bb_star[1]
star_pil_y = pil_y(HEADER_Y) - star_asc

left_x  = int(CX * S) - mw // 2 - GAP - sw
right_x = int(CX * S) + mw // 2 + GAP
draw.text((left_x,  star_pil_y), '★', fill=GREEN, font=fMissing)
draw.text((right_x, star_pil_y), '★', fill=GREEN, font=fMissing)

# Divider
hline(draw, M+18, HEADER_Y-14, 612-M-18, CHARCOAL, width_pts=1.2)

# ── Photo ─────────────────────────────────────────────────────────────────────
PHOTO_TOP_Y = HEADER_Y - 20          # 694 (RL top of photo)
PHOTO_H_RL  = 335
PHOTO_W_RL  = int(PHOTO_H_RL * 2560 / 3840)   # ≈ 223
PNL_PAD     = 5

# Panel background
rect(draw,
     CX - PHOTO_W_RL/2 - PNL_PAD,
     PHOTO_TOP_Y - PHOTO_H_RL - PNL_PAD,
     PHOTO_W_RL + 2*PNL_PAD,
     PHOTO_H_RL + 2*PNL_PAD,
     fill=PANEL, outline=CHARCOAL, width=px(1))

# Photo — rl_y_top = PHOTO_TOP_Y (the top of the image in RL coords)
paste_image(canvas, PHOTO_PATH,
            CX - PHOTO_W_RL/2, PHOTO_TOP_Y,
            PHOTO_W_RL, PHOTO_H_RL)

PHOTO_BOT_Y = PHOTO_TOP_Y - PHOTO_H_RL - PNL_PAD   # bottom of panel

# ── Reveal text ───────────────────────────────────────────────────────────────
REVEAL_Y = PHOTO_BOT_Y - 24

fReveal   = font(24, bold=True)
fServices = font(11, bold=True)
fArea     = font(10, bold=True)
fWebsite  = font(18, bold=True)
fIG       = font(10, bold=False)

draw_centered(draw, CX, REVEAL_Y,      'Missing a Pet Sitter or',          fReveal,   CHARCOAL)
draw_centered(draw, CX, REVEAL_Y - 28, 'Dog Walker in Your Life?',         fReveal,   CHARCOAL)
draw_centered(draw, CX, REVEAL_Y - 52, 'Dog Walking  ·  Adventure Hikes  ·  Pet Sitting', fServices, GREEN)

# ── Credentials row with logos ────────────────────────────────────────────────
CRED_Y    = REVEAL_Y - 75
LOGO_H_RL = 22
COL_W     = (612 - 2*(M+18)) / 3
fCredLbl  = font(9, bold=True)

creds = [
    (FF_LOGO,  'Fear Free Certified'),
    (PSI_LOGO, 'Bonded & Insured · PSI'),
    (PSA_LOGO, 'PSA Member'),
]

for i, (logo_path, label) in enumerate(creds):
    cx_col = M + 18 + (i + 0.5) * COL_W
    try:
        logo_src = Image.open(logo_path)
        lw_orig, lh_orig = logo_src.size
        logo_h_px = px(LOGO_H_RL)
        logo_w_px = int(logo_h_px * lw_orig / lh_orig)
        logo_resized = logo_src.resize((logo_w_px, logo_h_px), Image.LANCZOS)

        lbl_w = text_w(fCredLbl, label)
        GAP_PX = px(4)
        total_w = logo_w_px + GAP_PX + lbl_w
        logo_x = int(cx_col * S) - total_w // 2

        # Vertical center of this cred row
        center_pil_y = pil_y(CRED_Y + LOGO_H_RL / 2)
        logo_pil_y   = center_pil_y - logo_h_px // 2

        if logo_src.mode == 'RGBA':
            canvas.paste(logo_resized, (logo_x, logo_pil_y), logo_resized)
        else:
            canvas.paste(logo_resized.convert('RGB'), (logo_x, logo_pil_y))

        # Label — vertically centered with logo
        bb  = fCredLbl.getbbox(label)
        th  = bb[3] - bb[1]
        ty  = center_pil_y - th // 2 - bb[1]
        draw.text((logo_x + logo_w_px + GAP_PX, ty), label, fill=CHARCOAL, font=fCredLbl)
    except Exception as e:
        print(f'Logo error ({label}): {e}')

# Service area
draw_centered(draw, CX, CRED_Y - 30,
    'Serving West Atlanta  ·  within a 10 mile radius of 30318', fArea, CHARCOAL)

# Orange rule
RULE_Y = CRED_Y - 43
hline(draw, M+18, RULE_Y, 612-M-18, ORANGE, width_pts=2.5)

# ── QR codes + website + Instagram ───────────────────────────────────────────
QR_RL     = 62
QR_PX     = px(QR_RL)
QR_BOT_RL = RULE_Y - QR_RL - 6   # RL y of QR bottom edge
QR_TOP_RL = QR_BOT_RL + QR_RL    # RL y of QR top edge

qr_web  = make_qr(WEBSITE_URL, QR_PX)
qr_book = make_qr(BOOK_URL,    QR_PX)

# Left QR (website) — top-left corner
ql_x = int((M + 30) * S)
ql_y = pil_y(QR_TOP_RL)
canvas.paste(qr_web, (ql_x, ql_y))

# Right QR (book now)
qr_x = int((612 - M - 30 - QR_RL) * S)
canvas.paste(qr_book, (qr_x, ql_y))

LABEL_Y = QR_BOT_RL - 10
draw_centered(draw, M + 30 + QR_RL/2,        LABEL_Y, 'Website',  font(7), CHARCOAL)
draw_centered(draw, 612 - M - 30 - QR_RL/2,  LABEL_Y, 'Book Now', font(7), CHARCOAL)

# Center: website + Instagram
CTR_Y = QR_BOT_RL + QR_RL/2 + 8
draw_centered(draw, CX, CTR_Y,      'canipetthatdawg.co', fWebsite, ORANGE)
draw_centered(draw, CX, CTR_Y - 18, INSTAGRAM,            fIG,      CHARCOAL)

# ── Tear-off strips ────────────────────────────────────────────────────────────
STRIP_TOP   = LABEL_Y - 14
STRIP_BOT   = M + 8
STRIP_H_RL  = STRIP_TOP - STRIP_BOT
N           = 8
STRIP_W_RL  = (612 - 2*(M+8)) / N
STRIP_X0    = M + 8
fStripB     = font(7,  bold=True)
fStripR     = font(6,  bold=False)

for i in range(N):
    sx = STRIP_X0 + i * STRIP_W_RL
    bg = CHARCOAL if i % 2 == 0 else PANEL
    rect(draw, sx, STRIP_BOT, STRIP_W_RL, STRIP_H_RL, fill=bg, outline=CHARCOAL, width=1)

    fg = BG if i % 2 == 0 else CHARCOAL

    # Build a small horizontal label, then rotate 90° to run up the strip
    tw1, tw2 = text_w(fStripB, 'canipetthatdawg.co'), text_w(fStripR, INSTAGRAM)
    lbl_w  = max(tw1, tw2) + px(6)
    lbl_h  = px(14)
    lbl    = Image.new('RGB', (lbl_w, lbl_h), bg)
    ldraw  = ImageDraw.Draw(lbl)

    bb1 = fStripB.getbbox('canipetthatdawg.co')
    bb2 = fStripR.getbbox(INSTAGRAM)
    ldraw.text(((lbl_w - tw1)//2, 1 - bb1[1]),          'canipetthatdawg.co', fill=fg, font=fStripB)
    ldraw.text(((lbl_w - tw2)//2, lbl_h//2 - bb2[1]//2), INSTAGRAM,           fill=fg, font=fStripR)

    rotated = lbl.rotate(90, expand=True)

    strip_w_px = px(STRIP_W_RL)
    strip_h_px = px(STRIP_H_RL)
    rotated    = rotated.resize((strip_w_px - px(4), strip_h_px - px(4)), Image.LANCZOS)

    paste_x = int(sx * S) + px(2)
    paste_y = pil_y(STRIP_BOT + STRIP_H_RL) + px(2)
    canvas.paste(rotated, (paste_x, paste_y))

# Dashed cut lines between strips (drawn on top)
for i in range(1, N):
    sx = STRIP_X0 + i * STRIP_W_RL
    x_px = int(sx * S)
    y0   = pil_y(STRIP_BOT + STRIP_H_RL)
    y1   = pil_y(STRIP_BOT)
    for seg_start in range(y0, y1, px(5)):
        draw.line([(x_px, seg_start), (x_px, min(seg_start + px(3), y1))],
                  fill=BG, width=1)

# ── Save as PDF @ 300 DPI ─────────────────────────────────────────────────────
canvas.save(OUTPUT_PATH, 'PDF', resolution=300)
print(f'Saved {W_PX}×{H_PX}px @ {DPI} DPI → {OUTPUT_PATH}')
