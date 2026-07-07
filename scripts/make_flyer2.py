#!/usr/bin/env python3
"""
Generates the 'HEY HUMAN.' flyer at 300 DPI.
Layout: full-width header → two columns (photo LEFT, text RIGHT) → info below.
"""

from PIL import Image, ImageDraw, ImageFont
import qrcode, os

# ── Resolution & canvas ───────────────────────────────────────────────────────
DPI   = 300
W_PX  = int(8.5 * DPI)   # 2550
H_PX  = int(11  * DPI)   # 3300
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
OUTPUT_PATH = os.path.join(PUBLIC, 'hey human flyer.pdf')

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

# ── Drawing helpers ───────────────────────────────────────────────────────────
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
    """Draw text with visual top at ry_top. Returns pixel height."""
    b = f.getbbox(txt)
    draw.text((int(rx*S), pily(ry_top) - b[1]), txt, fill=fill, font=f)
    return b[3]-b[1]

def draw_center(draw, cx, ry_top, txt, f, fill):
    b = f.getbbox(txt)
    x = int(cx*S) - (b[2]-b[0])//2
    draw.text((x, pily(ry_top) - b[1]), txt, fill=fill, font=f)
    return b[3]-b[1]

def draw_paw_line(draw, rx, ry_top, emoji, text, fe, ft, ec, tc):
    be = fe.getbbox(emoji); bt = ft.getbbox(text)
    lh = max(be[3]-be[1], bt[3]-bt[1])
    x0 = int(rx*S)
    draw.text((x0, pily(ry_top)-be[1] + (lh-(be[3]-be[1]))//2), emoji, fill=ec, font=fe)
    x1 = x0 + (be[2]-be[0]) + px(6)
    draw.text((x1, pily(ry_top)-bt[1] + (lh-(bt[3]-bt[1]))//2), text,  fill=tc, font=ft)
    return lh

def paste_img(canvas, path, rx, ry_top, rw, rh):
    src = Image.open(path).convert('RGB')
    target_w, target_h = px(rw), px(rh)
    # Scale to fill, then center-crop
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

# ── Canvas & border ───────────────────────────────────────────────────────────
canvas = Image.new('RGB', (W_PX, H_PX), BG)
draw   = ImageDraw.Draw(canvas)
M = 5; CX = 306

# Single bold green border pushed to the edge
rect(draw, M, M, 612-2*M, 792-2*M, outline=GREEN, width=px(7))

# ── Header: dog emoji (left, facing right) + orange chat bubble (right) ───────
INN_X = M + 18
INN_R = 612 - M - 18
INN_W = INN_R - INN_X

PAGE_TOP = 792 - M - 28
HDR_H_RL = 96   # total header height in pts

# Dog emoji — render to temp image, flip, resize, paste
fe_dog   = efont(96)
be_dog   = fe_dog.getbbox('🐕')
tmp = Image.new('RGB', (be_dog[2] + 4, be_dog[3] + 4), BG)
ImageDraw.Draw(tmp).text((0, 0), '🐕', font=fe_dog, embedded_color=True)
dog_img  = tmp.crop((be_dog[0], be_dog[1], be_dog[2], be_dog[3]))
dog_img  = dog_img.transpose(Image.FLIP_LEFT_RIGHT)
# Scale up ~30%
new_dog_w = int(dog_img.width * 1.3)
new_dog_h = int(dog_img.height * 1.3)
dog_img  = dog_img.resize((new_dog_w, new_dog_h), Image.LANCZOS)
DOG_W_RL = new_dog_w / S
DOG_H_RL = new_dog_h / S

# Orange rounded chat bubble — slightly smaller, defined before dog paste so we can center dog
BUBBLE_PAD  = 10
BUB_L  = INN_X + DOG_W_RL + BUBBLE_PAD + 10
BUB_R  = INN_R
BUB_T  = PAGE_TOP - 4
BUB_B  = PAGE_TOP - HDR_H_RL + 4   # slightly smaller bubble

# Paste dog vertically centered with bubble
BUB_CY_RL  = (BUB_T + BUB_B) / 2
dog_top_px  = H_PX - int((BUB_CY_RL + DOG_H_RL / 2) * S)
canvas.paste(dog_img, (int(INN_X * S), dog_top_px))
RADIUS = int(18 * S)

bx0 = int(BUB_L * S);  by0 = H_PX - int(BUB_T * S)
bx1 = int(BUB_R * S);  by1 = H_PX - int(BUB_B * S)
BORDER_W = int(3.5 * S)
draw.rounded_rectangle([bx0, by0, bx1, by1], radius=RADIUS, fill=BG, outline=ORANGE, width=BORDER_W)

# Small tail pointing left toward dog
tail_tip_x  = int((BUB_L - 10) * S)
tail_base_x = bx0
tail_mid_y  = (by0 + by1) // 2
draw.polygon([
    (tail_base_x, tail_mid_y - int(9*S)),
    (tail_tip_x,  tail_mid_y),
    (tail_base_x, tail_mid_y + int(9*S)),
], fill=BG, outline=ORANGE, width=BORDER_W)

# "HEY HUMAN." in charcoal, auto-fit inside bubble
BUB_INNER_W = (BUB_R - BUB_L) - 28
for fsize in range(52, 14, -1):
    fh = font(fsize, bold=True)
    if tw(fh, 'HEY HUMAN.') <= px(BUB_INNER_W):
        break
bb  = fh.getbbox('HEY HUMAN.')
txt_cx_px = (bx0 + bx1) // 2
txt_cy_px = (by0 + by1) // 2
draw.text(
    (txt_cx_px - (bb[2]-bb[0])//2, txt_cy_px - (bb[3]-bb[1])//2 - bb[1]),
    'HEY HUMAN.', fill=ORANGE, font=fh
)

AFTER_HDR = BUB_B - 40

# Single orange rule under header
hline(draw, INN_X, AFTER_HDR, INN_R, ORANGE, wp=2)
AFTER_HDR -= 20

# ── Two-column section: text LEFT, photo RIGHT ───────────────────────────────
SPLIT   = M + 18 + int(INN_W * 0.50)  # 50/50 split

RIGHT_COL_W = INN_R - SPLIT
PHOTO_W     = int(RIGHT_COL_W * 0.88)
_photo_src  = Image.open(PHOTO_PATH)
PHOTO_H     = int(PHOTO_W * _photo_src.height / _photo_src.width)
PHOTO_X     = SPLIT + (RIGHT_COL_W - PHOTO_W) // 2  # centered in right col
PAD         = 5

rect(draw, PHOTO_X - PAD, AFTER_HDR - PHOTO_H - PAD,
     PHOTO_W + 2*PAD, PHOTO_H + 2*PAD,
     fill=PANEL, outline=CHARCOAL, width=px(1))
paste_img(canvas, PHOTO_PATH, PHOTO_X, AFTER_HDR, PHOTO_W, PHOTO_H)

PHOTO_BOT = AFTER_HDR - PHOTO_H

# Left column text — match right-side padding
LX = INN_X + 6

fLucky   = font(13, bold=False)
fBrand   = font(22, bold=True)
fQ       = font(17, bold=True)

def item_h(f, txt):
    b = f.getbbox(txt); return (b[3]-b[1]) / S

import textwrap

fe_paw   = efont(20)  # paw emoji font at valid size
PAW_W    = fe_paw.getbbox('🐾')[2] / S + 6  # emoji width + gap in pts
LEFT_COL_W = SPLIT - INN_X - 6  # available pts in left column

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

QUESTIONS = [
    ('Do you HAVE holiday travel coming up?', ORANGE),
    ('Do you NEED a check-in for your best friend while you\'re at work all day?', CHARCOAL),
    ('Do you WANT more peace of mind while you\'re away?!', ORANGE),
]

# Measure total height
line_h = item_h(fQ, 'A')
q_gap = 18
total_q_h = sum(len(wrap_text(fQ, q, LEFT_COL_W - PAW_W)) * line_h for q, _ in QUESTIONS) + q_gap * (len(QUESTIONS) - 1)
top_pad = (PHOTO_H - total_q_h) / 2

cur = AFTER_HDR - top_pad

for q_text, q_color in QUESTIONS:
    lines = wrap_text(fQ, q_text, LEFT_COL_W - PAW_W)
    for i, line in enumerate(lines):
        if i == 0:
            # draw paw + first line
            be = fe_paw.getbbox('🐾')
            lh_px = int(line_h * S)
            ey = pily(cur) + (lh_px - (be[3]-be[1])) // 2 - be[1]
            draw.text((int(LX*S), ey), '🐾', fill=q_color, font=fe_paw)
            draw_left(draw, LX + PAW_W, cur, line, fQ, q_color)
        else:
            draw_left(draw, LX + PAW_W, cur, line, fQ, q_color)
        cur -= line_h + 4
    cur -= q_gap - 4

# ── Below two columns ─────────────────────────────────────────────────────────
BELOW = PHOTO_BOT - 16

fSvc  = font(11, bold=True)
fTag  = font(9,  bold=False)
fArea = font(9,  bold=True)
fCred = font(9,  bold=True)

# ── "Luckily, you found / Can I Pet That Dawg?" centered in the white space ───
# Estimate top of bottom section (Adventure Hikes upward from BOT=M+30)
# Roughly: QR(58) + rule + serving(9) + creds(20) + tagline(9) + svc(11) + gaps ≈ 170 pts
APPROX_BOTTOM_TOP = (M + 80) + 58 + 16 + 12 + 20 + 14 + 9 + 10 + 11 + 10 + 35 + 40  # updated for raised bottom
GAP_MID = (PHOTO_BOT + APPROX_BOTTOM_TOP) / 2

fLucky  = font(14, bold=True)
fBrand  = font(26, bold=True)
lucky_h  = item_h(fLucky, 'Luckily, you found')
brand_h  = item_h(fBrand, 'Can I Pet That Dawg?')
block_h  = lucky_h + 10 + brand_h

lucky_top = GAP_MID + block_h / 2
draw_center(draw, CX, lucky_top, 'Luckily, you found', fLucky, CHARCOAL)
draw_center(draw, CX, lucky_top - lucky_h - 10, 'Can I Pet That Dawg?', fBrand, GREEN)

# ── Build bottom section upward from page bottom ──────────────────────────────
BOT = M + 80   # RL y just inside bottom border

# QR codes row — anchored to the bottom
QR_RL    = 58
QR_PX_SZ = px(QR_RL)
QR_BOT   = BOT
QR_TOP   = QR_BOT + QR_RL

qr_web  = make_qr(WEBSITE_URL, QR_PX_SZ)
qr_book = make_qr(BOOK_URL,    QR_PX_SZ)

ql_x = int((M + 28) * S)
canvas.paste(qr_web,  (ql_x,                    pily(QR_TOP)))
canvas.paste(qr_book, (int((612-M-28-QR_RL)*S), pily(QR_TOP)))

# Labels under QR codes
fLbl7 = font(7)
draw_center(draw, M+28+QR_RL/2,      QR_BOT - 3, 'Website',  fLbl7, CHARCOAL)
draw_center(draw, 612-M-28-QR_RL/2,  QR_BOT - 3, 'Book Now', fLbl7, CHARCOAL)

# Website + Instagram — stacked cleanly in the center of the QR row
fSite = font(15, bold=True)
fIG   = font(10)
site_h = fSite.getbbox('canipetthatdawg.co')[3] / S
ig_h   = fIG.getbbox(INSTAGRAM)[3] / S
total_h = site_h + 5 + ig_h
stack_top = QR_BOT + QR_RL/2 + total_h/2  # centered vertically in QR row

h = draw_center(draw, CX, stack_top, 'canipetthatdawg.co', fSite, ORANGE)
draw_center(draw, CX, stack_top - h/S - 6, INSTAGRAM, fIG, CHARCOAL)

# Orange rule above QR section
RULE_Y = QR_TOP + 40
hline(draw, INN_X, RULE_Y, INN_R, ORANGE, wp=2.5)

# Serving Atlanta
UP = RULE_Y + 35
h = draw_center(draw, CX, UP,
    'Serving Atlanta  ·  within a 10 mile radius of 30318', fArea, CHARCOAL)
UP += h/S + 12

# Credentials row
CRED_TOP  = UP
LOGO_H_RL = 20
COL_W     = INN_W / 3

for i, (logo_path, label) in enumerate([
    (FF_LOGO,  'Fear Free Certified'),
    (PSI_LOGO, 'Bonded & Insured · PSI'),
    (PSA_LOGO, 'PSA Member'),
]):
    cx_col = INN_X + (i + 0.5) * COL_W
    try:
        lsrc = Image.open(logo_path)
        lhpx = px(LOGO_H_RL)
        lwpx = int(lhpx * lsrc.size[0] / lsrc.size[1])
        lrsz = lsrc.resize((lwpx, lhpx), Image.LANCZOS)
        lw   = tw(fCred, label)
        tot  = lwpx + px(4) + lw
        lx   = int(cx_col*S) - tot//2
        cpy  = pily(CRED_TOP + LOGO_H_RL/2)
        lpy  = cpy - lhpx//2
        if lsrc.mode == 'RGBA':
            canvas.paste(lrsz, (lx, lpy), lrsz)
        else:
            canvas.paste(lrsz.convert('RGB'), (lx, lpy))
        bb = fCred.getbbox(label)
        draw.text((lx+lwpx+px(4), cpy-(bb[3]-bb[1])//2-bb[1]), label, fill=CHARCOAL, font=fCred)
    except Exception as e:
        print(f'Logo error: {e}')

UP = CRED_TOP + LOGO_H_RL + 24

h = draw_center(draw, CX, UP,
    "Local trails. Neighborhood walks. In-home pet care.",
    fTag, CHARCOAL)
UP += h/S + 18

draw_center(draw, CX, UP,
    'Adventure Hikes  ·  Walks  ·  Drop-Ins  ·  Overnight Care', fSvc, GREEN)


# ── Urgency line just above green border ─────────────────────────────────────
fUrgency = font(10, bold=True)
draw_center(draw, CX, M + 22,
    'My Summer Schedule is Filling Up  ·  Secure Your Spot Today!',
    fUrgency, ORANGE)

# ── Save ──────────────────────────────────────────────────────────────────────
canvas.save(OUTPUT_PATH, 'PDF', resolution=300)
print(f'Saved → {OUTPUT_PATH}')
print(f'Bottom section: RULE_Y={RULE_Y:.0f}, QR_BOT={QR_BOT:.0f}')
