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
const DATABASE_ID           = 'abc92211-0ce1-4460-a900-f1435cebbf64'
const HERO_DATABASE_ID      = '3f7da6447e7a4792b942d4ff295ed138'
const TRUSTBAR_DATABASE_ID  = 'f18f662a4c0449198b39b1207091ca3f'
const SERVICES_DATABASE_ID  = '75ccdef9e6da44ed83da12126cd726d7'
const WHY_DATABASE_ID       = '4dbc819c95144303a10d8bf3e5bfd29f'
const ABOUT_DATABASE_ID     = 'bcf60bb78c9b41779392ace442440040'
const ABOUT_TAGS_DATABASE_ID = '1939622b8f6342f8ba18c90c42c0f7a3'
const REVIEWS_DATABASE_ID   = '85196d1a9dde49ed830c6f242679bb58'
const BLOG_DATABASE_ID      = '4f17fabcd9224f9ab83295d519355454'
const DAWG_DATABASE_ID      = 'd9d8fceeeab54caea20a6274bc37267d'
const CTA_DATABASE_ID         = '5961c28c2d7445b4bd4ff939a609875f'
const CTA_CONTENT_DATABASE_ID = '07bd76ca8205407683f430b3e6ed6339'
const BOOKS_DATABASE_ID     = '7df9bc62749d4c9ab85e58a589a953ab'
const PODCASTS_DATABASE_ID  = 'b881ace1c78141cb92dcfed885e4807b'

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
    const raw = page.properties['Value']?.rich_text?.map(t => t.plain_text).join('') ?? ''
    const value = raw.replace(/ \| /g, '\n')
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

async function fetchAbout() {
  console.log('📡 Fetching about from Notion...')
  const [contentRes, tagsRes] = await Promise.all([
    notion.databases.query({ database_id: ABOUT_DATABASE_ID }),
    notion.databases.query({ database_id: ABOUT_TAGS_DATABASE_ID, sorts: [{ property: 'Order', direction: 'ascending' }] }),
  ])
  const content = {}
  contentRes.results.forEach(page => {
    const field = page.properties['Field']?.title?.[0]?.plain_text
    const value = richText(page.properties['Value'])
    if (field) content[field] = value
  })
  const tags = tagsRes.results.map(page => ({
    label: page.properties['Label']?.title?.[0]?.plain_text ?? '',
    color: COLOR_MAP[page.properties['Color']?.select?.name] ?? 'var(--muted)',
  }))
  writeFileSync(resolve(__dirname, '../src/data/about.json'), JSON.stringify({ content, tags }, null, 2))
  console.log('✅ Wrote about to src/data/about.json')
}

async function fetchReviews() {
  console.log('📡 Fetching reviews from Notion...')
  const response = await notion.databases.query({
    database_id: REVIEWS_DATABASE_ID,
    filter: { property: 'Published', checkbox: { equals: true } },
  })
  const items = response.results.map(page => ({
    text:   page.properties['Review']?.rich_text?.[0]?.plain_text ?? '',
    client: page.properties['Client Name']?.title?.[0]?.plain_text ?? '',
  }))
  writeFileSync(resolve(__dirname, '../src/data/reviews.json'), JSON.stringify(items, null, 2))
  console.log(`✅ Wrote ${items.length} reviews to src/data/reviews.json`)
}

async function fetchBlog() {
  console.log('📡 Fetching blog posts from Notion...')
  const response = await notion.databases.query({
    database_id: BLOG_DATABASE_ID,
    filter: { property: 'Status', select: { equals: 'Published' } },
    sorts: [{ property: 'Publish Date', direction: 'descending' }],
  })
  const items = response.results.map(page => {
    const raw = page.properties['Publish Date']?.date?.start
    const date = raw
      ? new Date(raw).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : ''
    return {
      title: page.properties['Title']?.title?.[0]?.plain_text ?? '',
      date,
    }
  })
  writeFileSync(resolve(__dirname, '../src/data/blog.json'), JSON.stringify(items, null, 2))
  console.log(`✅ Wrote ${items.length} blog posts to src/data/blog.json`)
}

async function fetchDawg() {
  console.log('📡 Fetching Dawg of the Day from Notion...')
  const COLOR_MAP_DAWG = { green: 'var(--green)', orange: 'var(--orange)', blue: 'var(--blue)' }
  const response = await notion.databases.query({
    database_id: DAWG_DATABASE_ID,
    filter: { property: 'Active', checkbox: { equals: true } },
    sorts: [{ property: 'Order', direction: 'ascending' }],
  })
  const items = response.results.map(page => ({
    name:  page.properties['Name']?.title?.[0]?.plain_text ?? '',
    breed: page.properties['Breed']?.rich_text?.[0]?.plain_text ?? '',
    note:  page.properties['Weekly Note']?.rich_text?.[0]?.plain_text ?? '',
    color: COLOR_MAP_DAWG[page.properties['Color']?.select?.name] ?? 'var(--green)',
  }))
  writeFileSync(resolve(__dirname, '../src/data/dawg.json'), JSON.stringify(items, null, 2))
  console.log(`✅ Wrote ${items.length} dawgs to src/data/dawg.json`)
}

async function fetchCTA() {
  console.log('📡 Fetching CTA actions from Notion...')
  const CTA_COLOR_MAP = { orange: '#C4892A', green: '#4A7C5E', blue: '#3A6B8A', cream: '#EDE5D2' }
  const response = await notion.databases.query({
    database_id: CTA_DATABASE_ID,
    sorts: [{ property: 'Order', direction: 'ascending' }],
  })
  const items = response.results.map(page => ({
    label:    page.properties['Label']?.title?.[0]?.plain_text ?? '',
    sub:      page.properties['Sub']?.rich_text?.[0]?.plain_text ?? '',
    href:     page.properties['URL']?.url ?? '#',
    color:    CTA_COLOR_MAP[page.properties['Color']?.select?.name] ?? '#C4892A',
    external: page.properties['External']?.checkbox ?? false,
  }))
  writeFileSync(resolve(__dirname, '../src/data/cta.json'), JSON.stringify(items, null, 2))
  console.log(`✅ Wrote ${items.length} CTA actions to src/data/cta.json`)
}

async function fetchBooks() {
  console.log('📡 Fetching reading list from Notion...')
  const response = await notion.databases.query({
    database_id: BOOKS_DATABASE_ID,
    filter: { property: 'Active', checkbox: { equals: true } },
    sorts: [{ property: 'Order', direction: 'ascending' }],
  })
  const items = response.results.map(page => ({
    title:  page.properties['Title']?.title?.[0]?.plain_text ?? '',
    author: page.properties['Author']?.rich_text?.[0]?.plain_text ?? '',
  }))
  writeFileSync(resolve(__dirname, '../src/data/books.json'), JSON.stringify(items, null, 2))
  console.log(`✅ Wrote ${items.length} books to src/data/books.json`)
}

async function fetchPodcasts() {
  console.log('📡 Fetching podcasts from Notion...')
  const response = await notion.databases.query({
    database_id: PODCASTS_DATABASE_ID,
    filter: { property: 'Active', checkbox: { equals: true } },
    sorts: [{ property: 'Order', direction: 'ascending' }],
  })
  const items = response.results.map(page => ({
    name:     page.properties['Name']?.title?.[0]?.plain_text ?? '',
    url:      page.properties['URL']?.url ?? null,
    initials: page.properties['Initials']?.rich_text?.[0]?.plain_text ?? '',
  }))
  writeFileSync(resolve(__dirname, '../src/data/podcasts.json'), JSON.stringify(items, null, 2))
  console.log(`✅ Wrote ${items.length} podcasts to src/data/podcasts.json`)
}

async function fetchCTAContent() {
  console.log('📡 Fetching CTA content from Notion...')
  const response = await notion.databases.query({ database_id: CTA_CONTENT_DATABASE_ID })
  const content = {}
  response.results.forEach(page => {
    const field = page.properties['Field']?.title?.[0]?.plain_text
    const value = page.properties['Value']?.rich_text?.[0]?.plain_text ?? ''
    if (field) content[field] = value
  })
  writeFileSync(resolve(__dirname, '../src/data/cta-content.json'), JSON.stringify(content, null, 2))
  console.log('✅ Wrote CTA content to src/data/cta-content.json')
}

// Required — build fails if these can't be fetched
const required = { pages: fetchPages, hero: fetchHero, trustBar: fetchTrustBar,
  services: fetchServices, why: fetchWhy, about: fetchAbout }

// Best-effort — logged as warnings, build continues with existing JSON stubs
const optional = { reviews: fetchReviews, blog: fetchBlog, dawg: fetchDawg,
  cta: fetchCTA, ctaContent: fetchCTAContent, books: fetchBooks, podcasts: fetchPodcasts }

Promise.allSettled([
  ...Object.entries(required).map(([name, fn]) =>
    fn().catch(err => { throw Object.assign(err, { _fetcher: name }) })),
  ...Object.entries(optional).map(([name, fn]) =>
    fn().catch(err => console.warn(`⚠️  ${name} skipped (${err.message.slice(0, 80)})`)))
]).then(results => {
  const failed = results.filter(r => r.status === 'rejected')
  if (failed.length) {
    failed.forEach(r => console.error(`❌ ${r.reason._fetcher ?? 'unknown'}: ${r.reason.message}`))
    process.exit(1)
  }
  console.log('🎉 All Notion data fetched successfully')
})
