import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const ASSETS = '/Users/cs/canipetthatdawg/src/assets'

// Images used by components — skip logos/creds (already small)
const SKIP = ['Fear Free Cert.webp', 'PSA.png', 'PSI Logo.png', 'TimetoPet.png', 'hero.png']

// Max display width — gallery polaroids are ~300px wide, PhotoStrips ~640px
// Use 1200px max to handle 2x retina without keeping 4K originals
const MAX_WIDTH = 1200
const WEBP_QUALITY = 82

const files = await readdir(ASSETS)

for (const file of files) {
  const ext = extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue
  if (SKIP.includes(file)) continue

  const src = join(ASSETS, file)
  const dest = join(ASSETS, basename(file, extname(file)) + '.webp')
  const { size: before } = await stat(src)

  try {
    const meta = await sharp(src).metadata()
    const needsResize = meta.width > MAX_WIDTH

    await sharp(src)
      .resize(needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined)
      .webp({ quality: WEBP_QUALITY })
      .toFile(dest)

    const { size: after } = await stat(dest)
    const pct = Math.round((1 - after / before) * 100)
    console.log(`✓ ${file} → ${basename(dest)}  ${(before/1024/1024).toFixed(1)}MB → ${(after/1024).toFixed(0)}KB  (${pct}% smaller)`)
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`)
  }
}
