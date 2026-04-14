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
const HERO_DATABASE_ID = '3f7da6447e7a4792b942d4ff295ed138'
const TRUSTBAR_DATABASE_ID = 'f18f662a4c0449198b39b1207091ca3f'
const SERVICES_DATABASE_ID = '75ccdef9e6da44ed83da12126cd726d7'
const WHY_DATABASE_ID = '4dbc819c95144303a10d8bf3e5bfd29f'

function richText(prop) {
  if (!prop?.rich_text) return ''
  return prop.rich_text.map(span => {
    const text = span.plain_text
    return span.annotations?.bold ? `**${text}**` : text
  }).join('')
}

const COLOR_MAP = {
  green: 'var(--green)',
  orange: 'var(--orange)',
  blue: 'var(--blue)',
  muted: 'var(--muted)',
  none: null,
}

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

async function fetchHero() {
  console.log('📡 Fetching hero from Notion...')
  const response = await notion.databases.query({ database_id: HERO_DATABASE_ID })
  const hero = {}
  response.results.forEach(page => {
    const field = page.properties['Field']?.title?.[0]?.plain_text
    const value = page.properties['Value']?.rich_text?.[0]?.plain_text ?? ''
    if (field) hero[field] = value
  })
  const outPath = resolve(__dirname, '../src/data/hero.json')
  writeFileSync(outPath, JSON.stringify(hero, null, 2))
  console.log('✅ Wrote hero to src/data/hero.json')
}

async function fetchTrustBar() {
  console.log('📡 Fetching trust bar from Notion...')
  const response = await notion.databases.query({
    database_id: TRUSTBAR_DATABASE_ID,
    sorts: [{ property: 'Order', direction: 'ascending' }],
  })
  const items = response.results.map(page => ({
    label: page.properties['Label']?.title?.[0]?.plain_text ?? '',
    value: page.properties['Value']?.rich_text?.[0]?.plain_text ?? '',
    color: COLOR_MAP[page.properties['Color']?.select?.name] ?? 'var(--muted)',
  }))
  writeFileSync(resolve(__dirname, '../src/data/trustbar.json'), JSON.stringify(items, null, 2))
  console.log('✅ Wrote trust bar to src/data/trustbar.json')
}

async function fetchServices() {
  console.log('📡 Fetching services from Notion...')
  const response = await notion.databases.query({
    database_id: SERVICES_DATABASE_ID,
    sorts: [{ property: 'Order', direction: 'ascending' }],
  })
  const items = response.results.map(page => ({
    name: page.properties['Name']?.title?.[0]?.plain_text ?? '',
    badge: richText(page.properties['Badge']),
    desc: richText(page.properties['Description']),
    price: richText(page.properties['Price']),
    note: richText(page.properties['Note']),
    badgeColor: COLOR_MAP[page.properties['BadgeColor']?.select?.name] ?? 'var(--muted)',
    accent: COLOR_MAP[page.properties['Accent']?.select?.name] ?? null,
    span: page.properties['Featured']?.checkbox ?? false,
  }))
  writeFileSync(resolve(__dirname, '../src/data/services.json'), JSON.stringify(items, null, 2))
  console.log('✅ Wrote services to src/data/services.json')
}

async function fetchWhy() {
  console.log('📡 Fetching why section from Notion...')
  const response = await notion.databases.query({
    database_id: WHY_DATABASE_ID,
    sorts: [{ property: 'Order', direction: 'ascending' }],
  })
  const items = response.results.map(page => ({
    title: page.properties['Title']?.title?.[0]?.plain_text ?? '',
    text: richText(page.properties['Text']),
    bar: COLOR_MAP[page.properties['Color']?.select?.name] ?? 'var(--muted)',
  }))
  writeFileSync(resolve(__dirname, '../src/data/why.json'), JSON.stringify(items, null, 2))
  console.log('✅ Wrote why section to src/data/why.json')
}

Promise.all([fetchPages(), fetchHero(), fetchTrustBar(), fetchServices(), fetchWhy()]).catch(err => {
  console.error('❌ Notion fetch failed:', err.message)
  process.exit(1)
})
