#!/usr/bin/env python3
"""
Can I Pet That Dawg? — Business Card
3.5 x 2 inches @ 300 DPI = 1050 x 600 px
Design matches the website hero aesthetic: dark, typographic, IBM Plex Mono
"""

from PIL import Image, ImageDraw, ImageFont
import qrcode
import os

DPI   = 300
W     = int(3.5 * DPI)  # 1050
H     = int(2.0 * DPI)  # 600

# Brand palette (from index.css)
DARK_BG   = "#1E1A15"   # hero-bg
CARD_DARK = "#221D19"   # card dark
CREAM     = "#EDE5D2"   # charcoal dark mode (light text on dark)
CREAM_DIM = "#9C9080"   # muted
ORANGE    = "#E8A547"   # dark-mode orange (pops on dark bg)
GREEN     = "#6DA888"   # dark-mode green

REVIEW_URL = "https://maps.app.goo.gl/AUMYPhWoRqEPeAL48"
WEBSITE    = "canipetthatdawg.co"

FONT_DIR = os.path.join(os.path.dirname(__file__), "..", "business_card", "fonts")
OUT_DIR  = os.path.join(os.path.dirname(__file__), "..", "business_card")
os.makedirs(OUT_DIR, exist_ok=True)


def font(size, bold=False):
    name = "IBMPlexMono-Bold.ttf" if bold else "IBMPlexMono-Regular.ttf"
    path = os.path.join(FONT_DIR, name)
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    # Fallback
    for fb in ["/System/Library/Fonts/Courier New Bold.ttf" if bold else "/System/Library/Fonts/Courier New.ttf",
               "/System/Library/Fonts/Helvetica.ttc"]:
        if os.path.exists(fb):
            return ImageFont.truetype(fb, size)
    return ImageFont.load_default()


def cx(draw, text, y, fnt, color, img_w=W, offset_x=0):
    """Draw horizontally centered text."""
    bb = draw.textbbox((0, 0), text, font=fnt)
    x = offset_x + (img_w - (bb[2] - bb[0])) // 2
    draw.text((x, y), text, font=fnt, fill=color)


def make_front():
    img  = Image.new("RGB", (W, H), DARK_BG)
    draw = ImageDraw.Draw(img)

    # ── Subtle noise texture via card panel ──────────────────────────────
    # Inner card with slight lift
    pad = 36
    draw.rounded_rectangle([pad, pad, W - pad, H - pad], radius=12,
                            fill=CARD_DARK, outline=ORANGE + "33", width=1)

    # ── Top label — small monospace allcaps ──────────────────────────────
    label_f = font(22)
    cx(draw, "PROFESSIONAL PET CARE  ·  ATLANTA, GA", pad + 28, label_f, CREAM_DIM)

    # ── Thin orange rule ─────────────────────────────────────────────────
    rule_y = pad + 68
    draw.rectangle([pad + 60, rule_y, W - pad - 60, rule_y + 2], fill=ORANGE)

    # ── Business name (large) ────────────────────────────────────────────
    big_f   = font(78, bold=True)
    plain   = "Can I Pet That Dawg"
    qmark   = "?"

    bb_p = draw.textbbox((0, 0), plain, font=big_f)
    bb_q = draw.textbbox((0, 0), qmark, font=big_f)
    total = (bb_p[2] - bb_p[0]) + (bb_q[2] - bb_q[0])
    sx    = (W - total) // 2
    name_y = rule_y + 18

    draw.text((sx, name_y), plain, font=big_f, fill=CREAM)
    draw.text((sx + (bb_p[2] - bb_p[0]), name_y), qmark, font=big_f, fill=ORANGE)

    # ── Person name ──────────────────────────────────────────────────────
    person_f = font(38)
    cx(draw, "Crickett Sykes", name_y + 100, person_f, CREAM)

    # ── Thin green rule ──────────────────────────────────────────────────
    rule2_y = name_y + 152
    draw.rectangle([pad + 60, rule2_y, W - pad - 60, rule2_y + 2], fill=GREEN)

    # ── Website ──────────────────────────────────────────────────────────
    web_f = font(34, bold=True)
    cx(draw, WEBSITE, rule2_y + 20, web_f, ORANGE)

    # ── Bottom scan hint ─────────────────────────────────────────────────
    hint_f = font(20)
    cx(draw, "↩  flip over to leave a review", rule2_y + 68, hint_f, CREAM_DIM)

    img.save(os.path.join(OUT_DIR, "card_front.png"), dpi=(DPI, DPI))
    print("Saved card_front.png")


def make_back():
    img  = Image.new("RGB", (W, H), DARK_BG)
    draw = ImageDraw.Draw(img)

    pad = 36
    draw.rounded_rectangle([pad, pad, W - pad, H - pad], radius=12,
                            fill=CARD_DARK, outline=GREEN + "44", width=1)

    # Left column: copy text
    col_split = W // 2 - 20
    inner_pad = pad + 48

    # ── Eyebrow ──────────────────────────────────────────────────────────
    eye_f = font(20)
    draw.text((inner_pad, pad + 28), "YOUR VISIT MATTERS", font=eye_f, fill=CREAM_DIM)

    # ── Rule ─────────────────────────────────────────────────────────────
    rule_y = pad + 62
    draw.rectangle([inner_pad, rule_y, col_split - 40, rule_y + 2], fill=ORANGE)

    # ── Heading ──────────────────────────────────────────────────────────
    head_f = font(52, bold=True)
    # Two lines
    draw.text((inner_pad, rule_y + 14), "Loved", font=head_f, fill=CREAM)
    draw.text((inner_pad, rule_y + 74), "your", font=head_f, fill=CREAM)
    draw.text((inner_pad, rule_y + 134), "visit?", font=head_f, fill=ORANGE)

    # ── Body copy ────────────────────────────────────────────────────────
    body_f = font(24)
    lines = [
        "A quick review",
        "means the world.",
        "Scan to share",
        "your experience.",
    ]
    body_y = rule_y + 210
    for line in lines:
        draw.text((inner_pad, body_y), line, font=body_f, fill=CREAM_DIM)
        body_y += 32

    # ── Brand at bottom left ─────────────────────────────────────────────
    brand_f = font(22, bold=True)
    draw.text((inner_pad, H - pad - 50), "Can I Pet That Dawg?", font=brand_f, fill=ORANGE)
    draw.text((inner_pad, H - pad - 24), WEBSITE, font=font(20), fill=CREAM_DIM)

    # ── Right column: QR code ─────────────────────────────────────────────
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=9,
        border=2,
    )
    qr.add_data(REVIEW_URL)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color=CREAM, back_color=CARD_DARK).convert("RGB")

    qr_size = 310
    qr_img  = qr_img.resize((qr_size, qr_size), Image.LANCZOS)
    qr_x    = col_split + 30
    qr_y    = (H - qr_size) // 2 - 20
    img.paste(qr_img, (qr_x, qr_y))

    # QR label
    qr_label_f = font(19)
    label_text  = "Google Review"
    bb = draw.textbbox((0, 0), label_text, font=qr_label_f)
    lx = qr_x + (qr_size - (bb[2] - bb[0])) // 2
    draw.text((lx, qr_y + qr_size + 10), label_text, font=qr_label_f, fill=CREAM_DIM)

    # Star row under label
    stars_f = font(22)
    stars   = "★ ★ ★ ★ ★"
    bb2     = draw.textbbox((0, 0), stars, font=stars_f)
    sx2     = qr_x + (qr_size - (bb2[2] - bb2[0])) // 2
    draw.text((sx2, qr_y + qr_size + 32), stars, font=stars_f, fill=ORANGE)

    img.save(os.path.join(OUT_DIR, "card_back.png"), dpi=(DPI, DPI))
    print("Saved card_back.png")


if __name__ == "__main__":
    make_front()
    make_back()
    print("Done — files in business_card/")
