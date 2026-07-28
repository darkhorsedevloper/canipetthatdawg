#!/usr/bin/env python3
"""
Open Graph / social preview card -> public/preview.jpg (1200x630).

Matches the site's hero: dark background (#1E1A15), cream + orange brand
type, the 🫳🏼🐕 mark, and the Bree-and-curly-dog photo on the right.
Referenced by index.html's og:image tag.

    python3 scripts/make_og_image.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ── Canvas (the standard OG size) ─────────────────────────────────────────────
W, H = 1200, 630

# ── Brand colors (from src/index.css) ─────────────────────────────────────────
HERO_BG  = (30, 26, 21)     # #1E1A15
CREAM    = (244, 239, 230)  # #F4EFE6
ORANGE   = (196, 137, 42)   # #C4892A
GREEN    = (74, 124, 94)    # #4A7C5E
MUTED    = (201, 190, 169)  # warm muted cream for sublines

# ── Paths ─────────────────────────────────────────────────────────────────────
ROOT   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTO  = os.path.join(ROOT, 'src/assets/bree-curly-kiss.jpeg')
OUT    = os.path.join(ROOT, 'public/preview.jpg')

# ── Fonts (Space Mono/IBM Plex aren't installed; SF Mono is the site's own
#    fallback, so the flyers already use it — stay consistent) ────────────────
FONT_DIRS = ['/System/Library/Fonts', '/System/Library/Fonts/Supplemental',
             os.path.expanduser('~/Library/Fonts'), '/Library/Fonts']
CANDIDATES = {
    True:  ['SpaceMono-Bold.ttf', 'IBMPlexMono-Bold.ttf', 'SFNSMono.ttf', 'Menlo.ttc'],
    False: ['SpaceMono-Regular.ttf', 'IBMPlexMono-Regular.ttf', 'SFNSMono.ttf', 'Menlo.ttc'],
}
EMOJI_FONT = '/System/Library/Fonts/Apple Color Emoji.ttc'
_EMOJI_VALID = [20, 32, 40, 48, 64, 96, 160]


def font(size, bold=False):
    for name in CANDIDATES[bold]:
        for d in FONT_DIRS:
            p = os.path.join(d, name)
            if os.path.exists(p):
                try:
                    return ImageFont.truetype(p, size)
                except Exception:
                    pass
    return ImageFont.load_default()


def efont(size):
    return ImageFont.truetype(EMOJI_FONT, min(_EMOJI_VALID, key=lambda s: abs(s - size)))


def rounded_crop(im, box_w, box_h, radius):
    """Center-crop `im` to fill box_w x box_h, then round the corners."""
    src_ratio, dst_ratio = im.width / im.height, box_w / box_h
    if src_ratio > dst_ratio:            # source is wider -> crop sides
        new_w = int(im.height * dst_ratio)
        im = im.crop(((im.width - new_w) // 2, 0, (im.width + new_w) // 2, im.height))
    else:                                 # source is taller -> crop top/bottom
        new_h = int(im.width / dst_ratio)
        im = im.crop((0, (im.height - new_h) // 2, im.width, (im.height + new_h) // 2))
    im = im.resize((box_w, box_h), Image.LANCZOS).convert('RGBA')
    mask = Image.new('L', (box_w, box_h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, box_w - 1, box_h - 1], radius, fill=255)
    im.putalpha(mask)
    return im


def draw_emoji(img, xy, text, size):
    """Paste a color-emoji string at target glyph height `size`.

    Rendered in one shot at a native bitmap size so multi-codepoint
    sequences (e.g. hand + skin-tone modifier) stay joined instead of
    splitting into a stray color-swatch tile. Returns the right edge x.
    """
    native = 96  # a size Apple Color Emoji actually ships bitmaps for
    ef = efont(native)
    canvas = Image.new('RGBA', (native * len(text) + native, native * 2), (0, 0, 0, 0))
    ImageDraw.Draw(canvas).text((0, 0), text, font=ef, embedded_color=True)
    canvas = canvas.crop(canvas.getbbox())
    scale = size / canvas.height
    canvas = canvas.resize((int(canvas.width * scale), size), Image.LANCZOS)
    img.paste(canvas, (int(xy[0]), int(xy[1])), canvas)
    return xy[0] + canvas.width


def main():
    img = Image.new('RGB', (W, H), HERO_BG)
    d = ImageDraw.Draw(img)

    # ── Photo panel, right side, rounded + thin orange keyline ───────────────
    pad = 40
    pw, ph = 400, H - 2 * pad
    px0 = W - pad - pw
    photo = rounded_crop(Image.open(PHOTO), pw, ph, 24)
    img.paste(photo, (px0, pad), photo)
    d.rounded_rectangle([px0, pad, px0 + pw - 1, pad + ph - 1], 24,
                        outline=ORANGE, width=3)

    # ── Text column, left ────────────────────────────────────────────────────
    x = 64

    # Eyebrow (creds), orange, tracked
    d.text((x, 74), "L I C E N S E D   ·   I N S U R E D   ·   B O N D E D",
           font=font(19, bold=True), fill=ORANGE)

    # Headline — "Go Ahead—" cream, "Pet that Dawg." orange
    hf = font(66, bold=True)
    d.text((x, 150), "Go Ahead—", font=hf, fill=CREAM)
    d.text((x, 232), "Pet that Dawg.", font=hf, fill=ORANGE)

    # Sublines
    sf = font(25)
    d.text((x, 340), "Dog walking & pet sitting", font=sf, fill=MUTED)
    d.text((x, 378), "in West Midtown Atlanta", font=sf, fill=MUTED)

    # Green accent rule
    d.rectangle([x, 440, x + 120, 444], fill=GREEN)

    # Footer: 🫳🐕 mark + domain. (No skin-tone modifier: this macOS emoji
    # font can't join it to the palm-down hand and leaves an orphan tile.)
    end = draw_emoji(img, (x, 536), "\U0001FAF3\U0001F415", 40)
    d.text((end + 16, 544), "canipetthatdawg.co",
           font=font(26, bold=True), fill=CREAM)

    img.save(OUT, 'JPEG', quality=88, optimize=True)
    print("wrote", OUT, img.size)


if __name__ == '__main__':
    main()
