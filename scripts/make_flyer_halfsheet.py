#!/usr/bin/env python3
"""
Half-sheet (5.5x8.5") version of the 'HEY HUMAN.' flyer for mailbox drops.
Renders one flyer at 5.5x8.5" @ 300 DPI, then tiles TWO copies side by side
on an 11x8.5" landscape letter sheet with a center cut line — print at home,
one straight cut down the middle yields two half-sheet flyers.
"""

from PIL import Image, ImageDraw, ImageFont
import qrcode, os

# ── Resolution & canvas (single half-sheet flyer) ─────────────────────────────
DPI   = 300
PW_PT = 5.5 * 72          # 396 pt wide
PH_PT = 8.5 * 72          # 612 pt tall
W_PX  = int(5.5 * DPI)    # 1650
H_PX  = int(8.5 * DPI)    # 2550
S     = DPI / 72          # ≈ 4.1667 px per pt

# ── Brand colors ──────────────────────────────────────────────────────────────
BG       = (244, 239, 230)
CHARCOAL = ( 42,  37,  32)
ORANGE   = (196, 137,  42)
GREEN    = ( 74, 124,  94)
PANEL    = (235, 229, 216)

# ── Paths ─────────────────────────────────────────────────────────────────────
ASSETS      = '/Users/cs/canipetthatdawg/src/assets'
PUBLIC      = '/Users/cs/canipetthatdawg/public'
PHOTO_PATH  = "/Users/cs/Desktop/💫🦮Can I Pet That Dawg LLC/Website/Photos/flyer2.jpeg"
FF_LOGO     = os.path.join(PUBLIC, 'fearfree.png')
PSI_LOGO    = os.path.join(ASSETS, 'PSI Logo.png')
PSA_LOGO    = os.path.join(ASSETS, 'PSA.png')
FLYER_DIR   = "/Users/cs/Desktop/💫🦮Can I Pet That Dawg LLC/Website/Flyer"
OUTPUT_PATH = os.path.join(FLYER_DIR, 'hey human flyer HALFSHEET 2up PRINT.pdf')
SINGLE_PATH = os.path.join(FLYER_DIR, 'hey human flyer HALFSHEET single.pdf')

WEBSITE_URL = 'https://canipetthatdawg.co'
BOOK_URL    = 'https://www.timetopet.com/portal/create/create-account'
INSTAGRAM   = '@pet_that_dawg'

# ── Font helpers ──────────────────────────────────────────────────────────────
FONT_DIRS = [os.path.expanduser('~/Library/Fonts'), '/Library/Fonts', '/System/Library/Fonts']
FONT_CANDIDATES = {
    True:  ['IBMPlexMono-Bold.ttf', 'SpaceMono-Bold.ttf', 'CourierNewBold.ttf', 'SFNSMono.ttf'],
    False: ['IBMPlexMono-Regular.ttf', 'SpaceMono-Regular.ttf', 'CourierNew.ttf', 'SFNSMono.ttf'],
}
EMOJI_FONT = '/System/Library/Fonts/Apple Color Emoji.ttc'
_EMOJI_VALID = [20, 32, 40, 48, 64, 96, 160]

_fcache = {}
def font(size_pts, bold=False):
    key = (size_pts, bold)
    if key in _fcache: return _fcache[key]
    px_size = max(1, int(size_pts * S))
    for name in FONT_CANDIDATES[bold]:
        for d in FONT_DIRS:
            p = os.path.join(d, name)
            if os.path.exists(p):
                try:
                    f = ImageFont.truetype(p, px_size)
                    _fcache[key] = f; return f
                except: pass
    _fcache[key] = ImageFont.load_default(); return _fcache[key]

def efont(size_pts):
    px_size = max(1, int(size_pts * S))
    return ImageFont.truetype(EMOJI_FONT, min(_EMOJI_VALID, key=lambda s: abs(s - px_size)))

# ── Drawing helpers (bottom-left origin in points; H_PX is module global) ─────
def px(pts):     return int(pts * S)
def pily(rl_y):  return H_PX - int(rl_y * S)

def rect(draw, rx, ry, rw, rh, fill=None, outline=None, width=1):
    draw.rectangle([int(rx*S), H_PX-int((ry+rh)*S), int((rx+rw)*S), H_PX-int(ry*S)],
                   fill=fill, outline=outline, width=width)

def hline(draw, x0, ry, x1, fill, wp=1):
    y = pily(ry)
    draw.line([(int(x0*S), y), (int(x1*S), y)], fill=fill, width=max(1, px(wp)))

def tw(f, t):
    b = f.getbbox(t); return b[2]-b[0]

def draw_left(draw, rx, ry_top, txt, f, fill):
    b = f.getbbox(txt)
    draw.text((int(rx*S), pily(ry_top) - b[1]), txt, fill=fill, font=f)
    return b[3]-b[1]

def draw_center(draw, cx, ry_top, txt, f, fill):
    b = f.getbbox(txt)
    x = int(cx*S) - (b[2]-b[0])//2
    draw.text((x, pily(ry_top) - b[1]), txt, fill=fill, font=f)
    return b[3]-b[1]

def paste_img(canvas, path, rx, ry_top, rw, rh):
    src = Image.open(path).convert('RGB')
    target_w, target_h = px(rw), px(rh)
    scale = max(target_w / src.width, target_h / src.height)
    new_w, new_h = int(src.width * scale), int(src.height * scale)
    src = src.resize((new_w, new_h), Image.LANCZOS)
    crop_x = (new_w - target_w) // 2
    crop_y = (new_h - target_h) // 2
    src = src.crop((crop_x, crop_y, crop_x + target_w, crop_y + target_h))
    canvas.paste(src, (int(rx*S), H_PX - int(ry_top*S)))

def make_qr(url, size_px):
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_M,
                       box_size=14, border=2)
    qr.add_data(url); qr.make(fit=True)
    img = qr.make_image(fill_color='#2A2520', back_color='#F4EFE6').convert('RGB')
    return img.resize((size_px, size_px), Image.LANCZOS)

def wrap_text(f, text, max_w_pts):
    words = text.split()
    lines, cur_line = [], []
    for word in words:
        test = ' '.join(cur_line + [word])
        if f.getbbox(test)[2] / S <= max_w_pts:
            cur_line.append(word)
        else:
            if cur_line:
                lines.append(' '.join(cur_line))
            cur_line = [word]
    if cur_line:
        lines.append(' '.join(cur_line))
    return lines

# ── Render one half-sheet flyer, return the 1650x2550 image ───────────────────
def render_flyer():
    canvas = Image.new('RGB', (W_PX, H_PX), BG)
    draw   = ImageDraw.Draw(canvas)
    M = 11; CX = PW_PT / 2   # 198

    # Single bold green border pushed toward the edge (inset for print safety)
    rect(draw, M, M, PW_PT-2*M, PH_PT-2*M, outline=GREEN, width=px(5))

    INN_X = M + 12
    INN_R = PW_PT - M - 12
    INN_W = INN_R - INN_X

    PAGE_TOP = PH_PT - M - 20
    HDR_H_RL = 66

    # Dog emoji — render, flip to face the bubble, scale
    fe_dog = efont(64)
    be_dog = fe_dog.getbbox('🐕')
    tmp = Image.new('RGB', (be_dog[2] + 4, be_dog[3] + 4), BG)
    ImageDraw.Draw(tmp).text((0, 0), '🐕', font=fe_dog, embedded_color=True)
    dog_img = tmp.crop((be_dog[0], be_dog[1], be_dog[2], be_dog[3])).transpose(Image.FLIP_LEFT_RIGHT)
    DOG_W_RL = dog_img.width / S
    DOG_H_RL = dog_img.height / S

    BUBBLE_PAD = 8
    BUB_L = INN_X + DOG_W_RL + BUBBLE_PAD + 6
    BUB_R = INN_R
    BUB_T = PAGE_TOP - 3
    BUB_B = PAGE_TOP - HDR_H_RL + 3

    BUB_CY_RL = (BUB_T + BUB_B) / 2
    dog_top_px = H_PX - int((BUB_CY_RL + DOG_H_RL / 2) * S)
    canvas.paste(dog_img, (int(INN_X * S), dog_top_px))
    RADIUS = int(13 * S)

    bx0 = int(BUB_L * S);  by0 = H_PX - int(BUB_T * S)
    bx1 = int(BUB_R * S);  by1 = H_PX - int(BUB_B * S)
    BORDER_W = int(2.5 * S)
    draw.rounded_rectangle([bx0, by0, bx1, by1], radius=RADIUS, fill=BG, outline=ORANGE, width=BORDER_W)

    # Tail pointing left toward the dog
    tail_tip_x  = int((BUB_L - 7) * S)
    tail_base_x = bx0
    tail_mid_y  = (by0 + by1) // 2
    draw.polygon([
        (tail_base_x, tail_mid_y - int(7*S)),
        (tail_tip_x,  tail_mid_y),
        (tail_base_x, tail_mid_y + int(7*S)),
    ], fill=BG, outline=ORANGE, width=BORDER_W)

    # "HEY HUMAN." auto-fit inside bubble
    BUB_INNER_W = (BUB_R - BUB_L) - 20
    for fsize in range(36, 10, -1):
        fh = font(fsize, bold=True)
        if tw(fh, 'HEY HUMAN.') <= px(BUB_INNER_W):
            break
    bb = fh.getbbox('HEY HUMAN.')
    txt_cx_px = (bx0 + bx1) // 2
    txt_cy_px = (by0 + by1) // 2
    draw.text((txt_cx_px - (bb[2]-bb[0])//2, txt_cy_px - (bb[3]-bb[1])//2 - bb[1]),
              'HEY HUMAN.', fill=ORANGE, font=fh)

    AFTER_HDR = BUB_B - 26
    hline(draw, INN_X, AFTER_HDR, INN_R, ORANGE, wp=1.5)
    AFTER_HDR -= 14

    # ── Two columns: questions LEFT, photo RIGHT ─────────────────────────────
    SPLIT = INN_X + int(INN_W * 0.50)
    RIGHT_COL_W = INN_R - SPLIT
    PHOTO_W = int(RIGHT_COL_W * 0.92)
    _photo_src = Image.open(PHOTO_PATH)
    PHOTO_H = int(PHOTO_W * _photo_src.height / _photo_src.width)
    PHOTO_X = SPLIT + (RIGHT_COL_W - PHOTO_W) // 2
    PAD = 4

    rect(draw, PHOTO_X - PAD, AFTER_HDR - PHOTO_H - PAD,
         PHOTO_W + 2*PAD, PHOTO_H + 2*PAD, fill=PANEL, outline=CHARCOAL, width=px(1))
    paste_img(canvas, PHOTO_PATH, PHOTO_X, AFTER_HDR, PHOTO_W, PHOTO_H)
    PHOTO_BOT = AFTER_HDR - PHOTO_H

    LX = INN_X + 4
    fQ = font(11, bold=True)
    fe_paw = efont(12)
    PAW_W = fe_paw.getbbox('🐾')[2] / S + 5
    LEFT_COL_W = SPLIT - INN_X - 4

    def item_h(f, txt):
        b = f.getbbox(txt); return (b[3]-b[1]) / S

    QUESTIONS = [
        ('Do you HAVE holiday travel coming up?', ORANGE),
        ("Do you NEED a check-in for your best friend while you're at work all day?", CHARCOAL),
        ("Do you WANT more peace of mind while you're away?!", ORANGE),
    ]

    line_h = item_h(fQ, 'A')
    q_gap = 12
    total_q_h = sum(len(wrap_text(fQ, q, LEFT_COL_W - PAW_W)) * line_h for q, _ in QUESTIONS) + q_gap * (len(QUESTIONS) - 1)
    top_pad = max(0, (PHOTO_H - total_q_h) / 2)
    cur = AFTER_HDR - top_pad

    for q_text, q_color in QUESTIONS:
        lines = wrap_text(fQ, q_text, LEFT_COL_W - PAW_W)
        for i, line in enumerate(lines):
            if i == 0:
                be = fe_paw.getbbox('🐾')
                lh_px = int(line_h * S)
                ey = pily(cur) + (lh_px - (be[3]-be[1])) // 2 - be[1]
                draw.text((int(LX*S), ey), '🐾', fill=q_color, font=fe_paw)
            draw_left(draw, LX + PAW_W, cur, line, fQ, q_color)
            cur -= line_h + 3
        cur -= q_gap - 3

    # ── "Luckily, you found / Can I Pet That Dawg?" centered in the gap ───────
    APPROX_BOTTOM_TOP = (M + 52) + 40 + 12 + 10 + 15 + 10 + 8 + 8 + 8 + 8 + 24 + 28
    GAP_MID = (PHOTO_BOT + APPROX_BOTTOM_TOP) / 2

    fLucky = font(10, bold=True)
    fBrand = font(17, bold=True)
    lucky_h = item_h(fLucky, 'Luckily, you found')
    brand_h = item_h(fBrand, 'Can I Pet That Dawg?')
    block_h = lucky_h + 7 + brand_h
    lucky_top = GAP_MID + block_h / 2
    draw_center(draw, CX, lucky_top, 'Luckily, you found', fLucky, CHARCOAL)
    draw_center(draw, CX, lucky_top - lucky_h - 7, 'Can I Pet That Dawg?', fBrand, GREEN)

    # ── Bottom section, built upward from the page bottom ─────────────────────
    BOT = M + 52
    QR_RL = 42
    QR_PX_SZ = px(QR_RL)
    QR_BOT = BOT
    QR_TOP = QR_BOT + QR_RL

    qr_web  = make_qr(WEBSITE_URL, QR_PX_SZ)
    qr_book = make_qr(BOOK_URL,    QR_PX_SZ)
    ql_x = int((M + 20) * S)
    canvas.paste(qr_web,  (ql_x,                          pily(QR_TOP)))
    canvas.paste(qr_book, (int((PW_PT-M-20-QR_RL)*S),     pily(QR_TOP)))

    fLbl = font(5.5)
    draw_center(draw, M+20+QR_RL/2,        QR_BOT - 3, 'Website',  fLbl, CHARCOAL)
    draw_center(draw, PW_PT-M-20-QR_RL/2,  QR_BOT - 3, 'Book Now', fLbl, CHARCOAL)

    fSite = font(11, bold=True)
    fIG   = font(7)
    site_h = fSite.getbbox('canipetthatdawg.co')[3] / S
    ig_h   = fIG.getbbox(INSTAGRAM)[3] / S
    total_h = site_h + 4 + ig_h
    stack_top = QR_BOT + QR_RL/2 + total_h/2
    h = draw_center(draw, CX, stack_top, 'canipetthatdawg.co', fSite, ORANGE)
    draw_center(draw, CX, stack_top - h/S - 5, INSTAGRAM, fIG, CHARCOAL)

    RULE_Y = QR_TOP + 26
    hline(draw, INN_X, RULE_Y, INN_R, ORANGE, wp=2)

    fArea = font(7, bold=True)
    fCred = font(6.5, bold=True)
    fTag  = font(7, bold=False)
    fSvc  = font(9, bold=True)

    UP = RULE_Y + 24
    h = draw_center(draw, CX, UP,
        'Serving Atlanta  ·  within 10 miles of 30318', fArea, CHARCOAL)
    UP += h/S + 10

    CRED_TOP = UP
    LOGO_H_RL = 14
    COL_W = INN_W / 3
    for i, (logo_path, label) in enumerate([
        (FF_LOGO,  'Fear Free'),
        (PSI_LOGO, 'Bonded & Insured'),
        (PSA_LOGO, 'PSA Member'),
    ]):
        cx_col = INN_X + (i + 0.5) * COL_W
        try:
            lsrc = Image.open(logo_path)
            lhpx = px(LOGO_H_RL)
            lwpx = int(lhpx * lsrc.size[0] / lsrc.size[1])
            lrsz = lsrc.resize((lwpx, lhpx), Image.LANCZOS)
            lw   = tw(fCred, label)
            tot  = lwpx + px(3) + lw
            lx   = int(cx_col*S) - tot//2
            cpy  = pily(CRED_TOP + LOGO_H_RL/2)
            lpy  = cpy - lhpx//2
            if lsrc.mode == 'RGBA':
                canvas.paste(lrsz, (lx, lpy), lrsz)
            else:
                canvas.paste(lrsz.convert('RGB'), (lx, lpy))
            bb = fCred.getbbox(label)
            draw.text((lx+lwpx+px(3), cpy-(bb[3]-bb[1])//2-bb[1]), label, fill=CHARCOAL, font=fCred)
        except Exception as e:
            print(f'Logo error: {e}')

    UP = CRED_TOP + LOGO_H_RL + 16
    h = draw_center(draw, CX, UP,
        'Local trails. Neighborhood walks. In-home pet care.', fTag, CHARCOAL)
    UP += h/S + 12
    draw_center(draw, CX, UP,
        'Adventure Hikes · Walks · Drop-Ins · Overnight Care', fSvc, GREEN)

    # Urgency line just above the bottom border
    fUrgency = font(8, bold=True)
    draw_center(draw, CX, M + 16,
        'Summer Schedule Filling Up · Secure Your Spot!', fUrgency, ORANGE)

    return canvas

# ── Tile TWO flyers side by side on a landscape letter sheet ───────────────────
def make_2up(flyer):
    SHEET_W = int(11 * DPI)   # 3300  (landscape letter width)
    SHEET_H = int(8.5 * DPI)  # 2550
    sheet = Image.new('RGB', (SHEET_W, SHEET_H), (255, 255, 255))
    sheet.paste(flyer, (0, 0))
    sheet.paste(flyer, (W_PX, 0))
    # Dashed center cut line
    d = ImageDraw.Draw(sheet)
    x = W_PX
    dash, gap = 24, 16
    y = 0
    while y < SHEET_H:
        d.line([(x, y), (x, min(y + dash, SHEET_H))], fill=(160, 160, 160), width=2)
        y += dash + gap
    return sheet

if __name__ == '__main__':
    flyer = render_flyer()
    flyer.save(SINGLE_PATH, 'PDF', resolution=300)
    sheet = make_2up(flyer)
    sheet.save(OUTPUT_PATH, 'PDF', resolution=300)
    print(f'Saved single → {SINGLE_PATH}')
    print(f'Saved 2-up   → {OUTPUT_PATH}')
