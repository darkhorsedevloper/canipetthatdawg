import qrcode
import io
from PIL import Image, ImageFont, ImageDraw
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader

# Colors
CREAM    = HexColor('#F4EFE6')
CHARCOAL = HexColor('#2A2520')
ORANGE   = HexColor('#C4892A')
GREEN    = HexColor('#4A7C5E')
MUTED    = HexColor('#7A736A')
BORDER   = HexColor('#D4CFC6')

W, H = letter  # 612 x 792

def make_qr(url):
    qr = qrcode.QRCode(version=2, box_size=6, border=2,
        error_correction=qrcode.constants.ERROR_CORRECT_M)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color='#2A2520', back_color='#F4EFE6')
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return ImageReader(buf)

def recolor_yellow_to_beige(img):
    """Replace yellow emoji skin tones with beige."""
    data = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = data[x, y]
            if a > 10 and r > 180 and g > 140 and b < 100 and r > g:
                # yellow-ish pixel — shift to beige skin tone
                ratio = r / 255.0
                data[x, y] = (
                    int(220 * ratio),
                    int(175 * ratio),
                    int(140 * ratio),
                    a
                )
    return img

def make_hand_dog_icon():
    """🐕 sitting, beige 🫳 petting from above — transparent background."""
    font_path = '/System/Library/Fonts/Apple Color Emoji.ttc'
    font_dog  = ImageFont.truetype(font_path, 96)
    font_hand = ImageFont.truetype(font_path, 64)

    sz = 180
    img = Image.new('RGBA', (sz, sz), (0, 0, 0, 0))

    # Dog — lower center
    dog = Image.new('RGBA', (sz, sz), (0, 0, 0, 0))
    ImageDraw.Draw(dog).text((sz // 2, sz // 2 + 36), '🐕', font=font_dog, anchor='mm', embedded_color=True)
    img = Image.alpha_composite(img, dog)

    # Hand — smaller, higher up, recolored to beige
    hand = Image.new('RGBA', (sz, sz), (0, 0, 0, 0))
    ImageDraw.Draw(hand).text((sz // 2, sz // 2 - 32), '🫳', font=font_hand, anchor='mm', embedded_color=True)
    hand = recolor_yellow_to_beige(hand)
    img = Image.alpha_composite(img, hand)

    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    return ImageReader(buf)

def draw_flyer(path):
    c = canvas.Canvas(path, pagesize=letter)

    # Background
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Top color stripe
    for i, col in enumerate([GREEN, ORANGE, HexColor('#3A6B8A')]):
        c.setFillColor(col)
        c.rect(i * (W / 3), H - 5, W / 3, 5, fill=1, stroke=0)

    # Header
    c.setFillColor(CHARCOAL)
    c.rect(0, H - 110, W, 105, fill=1, stroke=0)

    c.setFillColor(CREAM)
    c.setFont('Courier-Bold', 22)
    c.drawCentredString(W/2, H - 58, 'CAN I PET THAT DAWG LLC')

    c.setFillColor(ORANGE)
    c.setFont('Courier', 11)
    c.drawCentredString(W/2, H - 78, 'Enrichment-first.  Fear Free certified.  Built around your dog.')

    c.setFillColor(HexColor('#9A9490'))
    c.setFont('Courier', 9)
    c.drawCentredString(W/2, H - 96, 'Atlanta, GA  ·  Westside  ·  Midtown  ·  Buckhead')

    # ── Services ──────────────────────────────────────────
    y = H - 148
    c.setFillColor(GREEN)
    c.setFont('Courier-Bold', 9)
    c.drawString(52, y, 'SERVICES & PRICING')
    y -= 10
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(52, y, W - 52, y)
    y -= 36

    services = [
        ('Walk + Field Session', '75 min', '$75',  'Two dogs, no upcharge. No pack walks.'),
        ('Adventure Hike',       '3 hrs',  '$175', 'Real trails. Pre-screened for fitness and recall.'),
        ('Overnight Stay',       '24 hrs', '$160', "Your dog stays home & I'll even watch the cat."),
    ]

    for name, duration, price, note in services:
        c.setFillColor(ORANGE)
        c.rect(52, y - 2, 2, 38, fill=1, stroke=0)

        c.setFillColor(CHARCOAL)
        c.setFont('Courier-Bold', 13)
        c.drawString(62, y + 18, name)

        c.setFillColor(MUTED)
        c.setFont('Courier', 9)
        c.drawString(62, y + 6, duration + '  ·  ' + note)

        c.setFillColor(ORANGE)
        c.setFont('Courier-Bold', 20)
        c.drawRightString(W - 52, y + 12, price)

        y -= 52
        c.setStrokeColor(BORDER)
        c.setLineWidth(0.5)
        c.line(52, y + 6, W - 52, y + 6)
        y -= 8

    # ── Credentials ───────────────────────────────────────
    y -= 8
    c.setFillColor(GREEN)
    c.setFont('Courier-Bold', 8)
    c.drawString(52, y, 'CREDENTIALS & COVERAGE')
    y -= 10
    c.setStrokeColor(BORDER)
    c.line(52, y, W - 52, y)
    y -= 18

    creds = [
        ('Fear Free Certified',                                          GREEN),
        ('Pet Sitters International — Member',                           GREEN),
        ('Pet Sitters Associates — Insured & Bonded',                    GREEN),
        ('GPS check-in + photo report card every visit',                 MUTED),
        ('No hidden fees — no upcharges for meds or weekends',  MUTED),
    ]

    for text, color in creds:
        c.setFillColor(color)
        c.circle(58, y + 3, 2.5, fill=1, stroke=0)
        c.setFillColor(CHARCOAL)
        c.setFont('Courier', 10)
        c.drawString(66, y, text)
        y -= 18

    # ── QR section ────────────────────────────────────────
    y -= 16
    c.setStrokeColor(BORDER)
    c.line(52, y, W - 52, y)
    y -= 24

    qr_size = 100
    qr1_x = 70
    qr2_x = W - 70 - qr_size

    # Left QR — website
    qr1 = make_qr('https://canipetthatdawg.co')
    c.drawImage(qr1, qr1_x, y - qr_size, qr_size, qr_size)
    c.setFillColor(CHARCOAL)
    c.setFont('Courier-Bold', 8)
    c.drawCentredString(qr1_x + qr_size/2, y - qr_size - 14, 'VISIT THE SITE')
    c.setFillColor(MUTED)
    c.setFont('Courier', 7)
    c.drawCentredString(qr1_x + qr_size/2, y - qr_size - 24, 'canipetthatdawg.co')

    # Right QR — booking
    qr2 = make_qr('https://www.timetopet.com/portal/create/create-account')
    c.drawImage(qr2, qr2_x, y - qr_size, qr_size, qr_size)
    c.setFillColor(CHARCOAL)
    c.setFont('Courier-Bold', 8)
    c.drawCentredString(qr2_x + qr_size/2, y - qr_size - 14, 'BOOK NOW')

    # Center — hand over dog icon, no background
    mid_x = W / 2
    icon_size = 100
    icon = make_hand_dog_icon()
    c.drawImage(icon, mid_x - icon_size/2, y - qr_size/2 - icon_size/2, icon_size, icon_size, mask='auto')

    # ── Footer ─────────────────────────────────────────────
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, W, 38, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.setFont('Courier', 8)
    c.drawCentredString(W/2, 24, '@canipet_that_dawg_llc  ·  canipetthatdawg.co  ·  Atlanta, GA')
    c.setFillColor(HexColor('#9A9490'))
    c.setFont('Courier', 7)
    c.drawCentredString(W/2, 13, 'crickett@canipetthatdawg.co  ·  404-436-3039  ·  Fear Free Certified  ·  Insured & Bonded')

    for i, col in enumerate([GREEN, ORANGE, HexColor('#3A6B8A')]):
        c.setFillColor(col)
        c.rect(i * (W / 3), 37, W / 3, 3, fill=1, stroke=0)

    c.save()
    print(f'✅ Flyer saved to {path}')

draw_flyer('/Users/cs/canipetthatdawg/public/flyer.pdf')
