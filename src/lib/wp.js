// Simple WordPress REST API helper
// Prefer env var, but fall back to the project's WP endpoint so deploys don't break if the var is missing
const API_BASE =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  'https://work.tagagency.it/ventoadv/wp-json/wp/v2' // default for this project

async function fetchJSON(endpoint, { nextOptions, params } = {}) {
  if (!API_BASE) return null
  const url = new URL(endpoint, API_BASE.endsWith('/') ? API_BASE : API_BASE + '/')
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v))
    })
  }
  const res = await fetch(url.toString(), {
    headers: { 'Accept': 'application/json' },
    // Revalidate every 60s by default for SSG-like behavior
    next: { revalidate: 60, ...(nextOptions || {}) },
  })
  if (!res.ok) {
    throw new Error(`WP fetch failed: ${res.status} ${res.statusText} for ${url.toString()}`)
  }
  return res.json()
}

function extractFeaturedImage(item) {
  const media = item?._embedded?.['wp:featuredmedia']?.[0]
  return media?.source_url || null
}

function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
}

export async function getCategories() {
  const data = await fetchJSON('categories', { params: { per_page: 100 } })
  if (!data) return []
  return data.map(c => ({ id: c.id, name: c.name, slug: c.slug }))
}

export async function getPosts({ page = 1, perPage = 12, search = '', category = '', embed = true } = {}) {
  const params = { page, per_page: perPage, search }
  if (category) params.categories = category
  if (embed) params._embed = 'true'
  const data = await fetchJSON('posts', { params })
  if (!data) return []
  return data.map(p => ({
    id: p.id,
    slug: p.slug,
    title: stripHtml(p.title?.rendered) || 'Senza titolo',
    excerpt: stripHtml(p.excerpt?.rendered),
    date: p.date,
    categories: p.categories || [],
    image: extractFeaturedImage(p),
    author: typeof p._embedded?.author?.[0]?.name === 'string' ? p._embedded.author[0].name : undefined,
    readTime: `${Math.max(1, Math.round(stripHtml(p.content?.rendered || '').split(/\s+/).length / 200))} min`,
  }))
}

export async function getPostById(id) {
  const params = { _embed: 'true' }
  const data = await fetchJSON(`posts/${id}`, { params })
  if (!data) return null
  return {
    id: data.id,
    slug: data.slug,
    title: data.title?.rendered || '',
    content: data.content?.rendered || '',
    date: data.date,
    categories: data.categories || [],
    image: extractFeaturedImage(data),
    author: typeof data._embedded?.author?.[0]?.name === 'string' ? data._embedded.author[0].name : undefined,
    readTime: `${Math.max(1, Math.round(stripHtml(data.content?.rendered || '').split(/\s+/).length / 200))} min`,
  }
}

export async function getPostBySlug(slug) {
  if (!slug) return null
  const params = { slug, _embed: 'true' }
  const data = await fetchJSON('posts', { params })
  if (!data || !Array.isArray(data) || data.length === 0) return null
  const item = data[0]
  return {
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered || '',
    content: item.content?.rendered || '',
    date: item.date,
    categories: item.categories || [],
    image: extractFeaturedImage(item),
    author: typeof item._embedded?.author?.[0]?.name === 'string' ? item._embedded.author[0].name : undefined,
    readTime: `${Math.max(1, Math.round(stripHtml(item.content?.rendered || '').split(/\s+/).length / 200))} min`,
  }
}

export async function getPageBySlug(slug) {
  if (!slug) return null
  const params = { slug, _embed: 'true' }
  const data = await fetchJSON('pages', { params })
  if (!data || !Array.isArray(data) || data.length === 0) return null
  const item = data[0]
  
  // Try to extract featured image from embedded data first
  let featuredImage = extractFeaturedImage(item)
  
  // Check if there's a custom field for hero_image (ACF or meta)
  // ACF hero_image might be an ID or a URL
  if (!featuredImage && item.acf?.hero_image) {
    const heroImageValue = item.acf.hero_image
    // If it's a number (media ID), fetch the image URL
    if (typeof heroImageValue === 'number') {
      try {
        const wpBase = API_BASE.replace('/wp-json/wp/v2', '')
        const res = await fetch(`${wpBase}/wp-json/wp/v2/media/${heroImageValue}`, {
          headers: { 'Accept': 'application/json' },
          next: { revalidate: 60 },
        })
        if (res.ok) {
          const mediaData = await res.json()
          featuredImage = mediaData?.source_url || mediaData?.guid?.rendered || null
        } else {
          console.log(`Could not fetch hero_image media ${heroImageValue}: ${res.status}`)
        }
      } catch (e) {
        console.log('Could not fetch hero_image media:', e.message)
      }
    } else if (typeof heroImageValue === 'string') {
      // If it's already a URL string
      featuredImage = heroImageValue
    } else if (heroImageValue && typeof heroImageValue === 'object' && heroImageValue.url) {
      // If it's an ACF image object with url property
      featuredImage = heroImageValue.url
    }
  }
  
  // Check meta fields
  if (!featuredImage && item.meta?.hero_image) {
    featuredImage = item.meta.hero_image
  }
  
  // If embedded failed but featured_media ID exists, try to get the attachment page
  if (!featuredImage && item.featured_media && item.featured_media > 0) {
    try {
      const wpBase = API_BASE.replace('/wp-json/wp/v2', '')
      const attachmentUrl = `${wpBase}/wp-json/wp/v2/media/${item.featured_media}`
      
      const res = await fetch(`${attachmentUrl}?context=view`, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 60 },
      })
      
      if (res.ok) {
        const mediaData = await res.json()
        featuredImage = mediaData?.source_url || 
                       mediaData?.guid?.rendered || 
                       mediaData?.media_details?.sizes?.full?.source_url ||
                       null
      }
    } catch (e) {
      // Silent fail - will try other methods
    }
  }
  
  return {
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered || '',
    customTitle: item.acf?.titolo || item.meta?.titolo || null,
    subtitle: item.acf?.sottotitolo || item.meta?.sottotitolo || null,
    content: item.content?.rendered || '',
    image: featuredImage,
  }
}
