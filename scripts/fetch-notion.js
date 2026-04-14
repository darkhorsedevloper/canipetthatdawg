import { Client } from '@notionhq/client'
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname2 = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname2, '../.env')
if (existsSync(envPath)) {
  readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...val] = line.split('=')
    if (key && val.length) process.env[key.trim()] = val.join('=').trim()
  })
}

const __dirname = dirname(fileURLToPath(import.meta.url))


const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATABASE_ID = 'abc92211-0ce1-4460-a900-f1435cebbf64'

async function fetchPages() {
  console.log('📡 Fetching pages from Notion...')

  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: 'Status',
      select: { equals: 'Published' },
    },
    sorts: [{ property: 'Nav Order', direction: 'ascending' }],
  })

  const pages = response.results.map(page => {
    const props = page.properties
    return {
      id: page.id,
      name: props['Page Name']?.title?.[0]?.plain_text ?? '',
      slug: props['Slug']?.rich_text?.[0]?.plain_text ?? '',
      seoTitle: props['SEO Title']?.rich_text?.[0]?.plain_text ?? '',
      seoDescription: props['SEO Description']?.rich_text?.[0]?.plain_text ?? '',
      inNavBar: props['In Nav Bar']?.checkbox ?? false,
      navOrder: props['Nav Order']?.number ?? 99,
      pageType: props['Page Type']?.select?.name ?? '',
      status: props['Status']?.select?.name ?? '',
    }
  })

  const outPath = resolve(__dirname, '../src/data/pages.json')
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, JSON.stringify(pages, null, 2))
  console.log(`✅ Wrote ${pages.length} pages to src/data/pages.json`)
}

fetchPages().catch(err => {
  console.error('❌ Notion fetch failed:', err.message)
  process.exit(1)
})
