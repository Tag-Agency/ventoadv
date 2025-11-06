// Simple WordPress REST API helper
// Prefer env var, but fall back to the project's WP endpoint so deploys don't break if the var is missing
const API_BASE =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  'https://wp.ventoadv.it/wp-json/wp/v2' // default for this project
const NO_STORE =
  String(process.env.NEXT_PUBLIC_NO_STORE || '').toLowerCase() === '1' ||
  String(process.env.NEXT_PUBLIC_NO_STORE || '').toLowerCase() === 'true'

// Optional basic auth for protected media endpoints (server-side only)
const BASIC_USER = process.env.WP_BASIC_AUTH_USER || process.env.BASIC_AUTH_USER
const BASIC_PASS = process.env.WP_BASIC_AUTH_PASS || process.env.BASIC_AUTH_PASS
const IS_SERVER = typeof window === 'undefined'
function authHeaders() {
  if (!IS_SERVER) return {}
  if (!BASIC_USER || !BASIC_PASS) return {}
  try {
    const token = Buffer.from(`${BASIC_USER}:${BASIC_PASS}`).toString('base64')
    return { Authorization: `Basic ${token}` }
  } catch (e) {
    return {}
  }
}

async function fetchJSON(endpoint, { nextOptions, params } = {}) {
  if (!API_BASE) return null
  const url = new URL(endpoint, API_BASE.endsWith('/') ? API_BASE : API_BASE + '/')
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v))
    })
  }
  const baseOptions = { headers: { 'Accept': 'application/json' } }
  const cacheOptions = NO_STORE
    ? { cache: 'no-store' }
    : { next: { revalidate: 60, ...(nextOptions || {}) } }
  
  try {
    const res = await fetch(url.toString(), { 
      ...baseOptions, 
      ...cacheOptions,
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })
    if (!res.ok) {
      console.warn(`WP fetch failed: ${res.status} ${res.statusText} for ${url.toString()}`)
      return null
    }
    return res.json()
  } catch (error) {
    console.warn(`WP fetch error for ${url.toString()}:`, error.message)
    return null
  }
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
  const data = await fetchJSON('categories', { 
    params: { per_page: 100 },
    nextOptions: { revalidate: 10 } // Match blog page cache timing
  })
  if (!data) return []
  return data.map(c => ({ id: c.id, name: c.name, slug: c.slug, parent: c.parent }))
}

// Fetch global settings (colors etc.) from a dedicated WordPress page (by common slugs)
export async function getGlobalSettings() {
  const overrideSlug = process.env.NEXT_PUBLIC_GLOBAL_SETTINGS_SLUG
  const candidateSlugs = [overrideSlug, 'global', 'impostazioni-globali', 'impostazioni', 'settings'].filter(Boolean)
  let acf = null
  // 1) Try by page slug candidates
  for (const slug of candidateSlugs) {
    const data = await fetchJSON('pages', { params: { slug } })
    if (data && Array.isArray(data) && data[0]?.acf) {
      acf = data[0].acf
      break
    }
  }
  // 2) Try ACF Options endpoint if available
  if (!acf) {
    try {
      const wpBase = API_BASE.replace('/wp-json/wp/v2', '')
      const url = `${wpBase}/wp-json/acf/v3/options/options`
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json', ...authHeaders() },
        ...(NO_STORE ? { cache: 'no-store' } : { next: { revalidate: 60 } })
      })
      if (res.ok) {
        const json = await res.json()
        if (json && typeof json === 'object' && json.acf) {
          acf = json.acf
        }
      }
    } catch (_) {
      // ignore
    }
  }
  // Defaults (match current Tailwind defaults)
  const defaults = {
    primary: '#d2ad40',   // mustard (logo)
    secondary: '#4f4f4f', // dark gray
    white: '#ffffff',
  }
  if (!acf) return defaults

  // Flexible key lookup to tolerate different ACF field names
  const get = (keys) => {
    for (const k of keys) {
      const v = acf[k]
      if (typeof v === 'string' && v.trim()) return v.trim()
    }
    return null
  }

  // Map: colore uno = dark gray (secondary), colore due = mustard (primary), colore tre = white
  const secondary = get(['colore_uno', 'colore1', 'color_one', 'secondary', 'grigio', 'grigio_scuro']) || defaults.secondary
  const primary = get(['colore_due', 'colore2', 'color_two', 'primary', 'giallo', 'giallo_senape']) || defaults.primary
  const white = get(['colore_tre', 'colore3', 'color_three', 'white', 'bianco']) || defaults.white

  return { primary, secondary, white }
}

export async function getPosts({ page = 1, perPage = 12, search = '', category = '', embed = true, revalidate = 60 } = {}) {
  const params = { page, per_page: perPage, search }
  if (category) params.categories = category
  if (embed) params._embed = 'true'
  const data = await fetchJSON('posts', { 
    params, 
    nextOptions: { revalidate } 
  })
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

export async function getPageBySlug(slug, revalidate = 30) {
  if (!slug) return null
  const params = { slug, _embed: 'true' }
  const data = await fetchJSON('pages', { 
    params, 
    nextOptions: { revalidate } 
  })
  if (!data || !Array.isArray(data) || data.length === 0) return null
  const item = data[0]
  
  // Prefer ACF hero image first; fallback to featured image if hero missing
  let featuredImage = null
  let featuredImageAlt = null
  
  // Check if there's a custom field for hero_image (ACF or meta)
  // Support both flat fields and the consolidated ACF "hero" group.
  // ACF hero_image might be an ID, a URL string, or an object with a `url` property.
  const heroGroup = item.acf?.hero || null
  const heroImageValue = heroGroup?.hero_image || item.acf?.hero_image || item.acf?.background
  if (!featuredImage && heroImageValue) {
    // If it's a number (media ID), try to fetch the image URL without authentication
    if (typeof heroImageValue === 'number') {
      try {
        const wpBase = API_BASE.replace('/wp-json/wp/v2', '')
        
        // Try direct media endpoint first (sometimes works without auth)
  const mediaUrl = `${wpBase}/wp-json/wp/v2/media/${heroImageValue}?context=view`
        const res = await fetch(mediaUrl, { 
          headers: { 'Accept': 'application/json', ...authHeaders() },
          ...(NO_STORE ? { cache: 'no-store' } : { next: { revalidate: 60 } })
        })
        
        if (res.ok) {
          const mediaData = await res.json()
          featuredImage = mediaData?.source_url || mediaData?.guid?.rendered || null
          featuredImageAlt = mediaData?.alt_text || featuredImageAlt
        }
        
        // If direct endpoint failed, search through public media library with pagination (first 5 pages)
        if (!featuredImage) {
          for (let page = 1; page <= 5 && !featuredImage; page++) {
            const publicMediaUrl = `${wpBase}/wp-json/wp/v2/media?per_page=100&page=${page}&orderby=id&order=desc`
            const publicRes = await fetch(publicMediaUrl, { 
              headers: { 'Accept': 'application/json', ...authHeaders() },
              ...(NO_STORE ? { cache: 'no-store' } : { next: { revalidate: 60 } })
            })
            if (!publicRes.ok) break
            const mediaList = await publicRes.json()
            const mediaItem = Array.isArray(mediaList) ? mediaList.find(m => m.id === heroImageValue) : null
            if (mediaItem?.source_url) {
              featuredImage = mediaItem.source_url
              featuredImageAlt = mediaItem?.alt_text || featuredImageAlt
              break
            }
            // If list is shorter than requested, no more pages
            if (!Array.isArray(mediaList) || mediaList.length < 100) break
          }
        }
      } catch (e) {
        console.log('Could not fetch hero_image media:', e.message)
      }
    } else if (typeof heroImageValue === 'string') {
      // String can be a URL or a numeric ID stored as string
      const strVal = heroImageValue.trim()
      if (/^\d+$/.test(strVal)) {
        // Looks like an ID in string form -> resolve like a numeric ID
        try {
          const numericId = parseInt(strVal, 10)
          const wpBase = API_BASE.replace('/wp-json/wp/v2', '')
          const mediaUrl = `${wpBase}/wp-json/wp/v2/media/${numericId}?context=view`
          const res = await fetch(mediaUrl, {
            headers: { 'Accept': 'application/json', ...authHeaders() },
            ...(NO_STORE ? { cache: 'no-store' } : { next: { revalidate: 60 } })
          })
          if (res.ok) {
            const mediaData = await res.json()
            featuredImage = mediaData?.source_url || mediaData?.guid?.rendered || null
            featuredImageAlt = mediaData?.alt_text || featuredImageAlt
          }
          if (!featuredImage) {
            for (let page = 1; page <= 5 && !featuredImage; page++) {
              const publicMediaUrl = `${wpBase}/wp-json/wp/v2/media?per_page=100&page=${page}&orderby=id&order=desc`
              const publicRes = await fetch(publicMediaUrl, {
                headers: { 'Accept': 'application/json', ...authHeaders() },
                ...(NO_STORE ? { cache: 'no-store' } : { next: { revalidate: 60 } })
              })
              if (!publicRes.ok) break
              const mediaList = await publicRes.json()
              const mediaItem = Array.isArray(mediaList) ? mediaList.find(m => m.id === numericId) : null
              if (mediaItem?.source_url) {
                featuredImage = mediaItem.source_url
                featuredImageAlt = mediaItem?.alt_text || featuredImageAlt
                break
              }
              if (!Array.isArray(mediaList) || mediaList.length < 100) break
            }
          }
        } catch (e) {
          // ignore and fall through
        }
      } else if (/^https?:\/\//.test(strVal) || strVal.startsWith('/')) {
        // It's a proper URL (absolute or site-relative)
        featuredImage = strVal
      } else {
        // Unknown string format -> leave null and rely on fallbacks
      }
    } else if (heroImageValue && typeof heroImageValue === 'object') {
      // If it's an ACF image object, try common properties in order of preference
      featuredImage = heroImageValue.url || heroImageValue.source_url || heroImageValue?.sizes?.full || null
      featuredImageAlt = heroImageValue.alt || heroImageValue.alt_text || featuredImageAlt
    }
  }

  // Secondary fallback: try legacy/background field if present and hero was not resolved
  if (!featuredImage) {
    const backgroundValue = heroGroup?.background || item.acf?.background
    if (backgroundValue) {
      if (typeof backgroundValue === 'string') {
        const strVal = backgroundValue.trim()
        if (/^\d+$/.test(strVal)) {
          // Resolve numeric string ID
          try {
            const numericId = parseInt(strVal, 10)
            const wpBase = API_BASE.replace('/wp-json/wp/v2', '')
            const mediaUrl = `${wpBase}/wp-json/wp/v2/media/${numericId}?context=view`
            const res = await fetch(mediaUrl, {
              headers: { 'Accept': 'application/json', ...authHeaders() },
              ...(NO_STORE ? { cache: 'no-store' } : { next: { revalidate: 60 } })
            })
            if (res.ok) {
              const mediaData = await res.json()
              featuredImage = mediaData?.source_url || mediaData?.guid?.rendered || null
              featuredImageAlt = mediaData?.alt_text || featuredImageAlt
            }
            if (!featuredImage) {
              for (let page = 1; page <= 5 && !featuredImage; page++) {
                const publicMediaUrl = `${wpBase}/wp-json/wp/v2/media?per_page=100&page=${page}&orderby=id&order=desc`
                const publicRes = await fetch(publicMediaUrl, {
                  headers: { 'Accept': 'application/json', ...authHeaders() },
                  ...(NO_STORE ? { cache: 'no-store' } : { next: { revalidate: 60 } })
                })
                if (!publicRes.ok) break
                const mediaList = await publicRes.json()
                const mediaItem = Array.isArray(mediaList) ? mediaList.find(m => m.id === numericId) : null
                if (mediaItem?.source_url) {
                  featuredImage = mediaItem.source_url
                  featuredImageAlt = mediaItem?.alt_text || featuredImageAlt
                  break
                }
                if (!Array.isArray(mediaList) || mediaList.length < 100) break
              }
            }
          } catch (e) {
            // ignore
          }
        } else if (/^https?:\/\//.test(strVal) || strVal.startsWith('/')) {
          featuredImage = strVal
        }
      } else if (typeof backgroundValue === 'number') {
        try {
          const wpBase = API_BASE.replace('/wp-json/wp/v2', '')
          const mediaUrl = `${wpBase}/wp-json/wp/v2/media/${backgroundValue}?context=view`
          const res = await fetch(mediaUrl, { 
            headers: { 'Accept': 'application/json', ...authHeaders() },
            ...(NO_STORE ? { cache: 'no-store' } : { next: { revalidate: 60 } })
          })
          if (res.ok) {
            const mediaData = await res.json()
            featuredImage = mediaData?.source_url || mediaData?.guid?.rendered || null
            featuredImageAlt = mediaData?.alt_text || featuredImageAlt
          }
          if (!featuredImage) {
            for (let page = 1; page <= 5 && !featuredImage; page++) {
              const publicMediaUrl = `${wpBase}/wp-json/wp/v2/media?per_page=100&page=${page}&orderby=id&order=desc`
              const publicRes = await fetch(publicMediaUrl, { 
                headers: { 'Accept': 'application/json', ...authHeaders() },
                ...(NO_STORE ? { cache: 'no-store' } : { next: { revalidate: 60 } })
              })
              if (!publicRes.ok) break
              const mediaList = await publicRes.json()
              const mediaItem = Array.isArray(mediaList) ? mediaList.find(m => m.id === backgroundValue) : null
              if (mediaItem?.source_url) {
                featuredImage = mediaItem.source_url
                featuredImageAlt = mediaItem?.alt_text || featuredImageAlt
                break
              }
              if (!Array.isArray(mediaList) || mediaList.length < 100) break
            }
          }
        } catch (e) {
          // ignore
        }
      } else if (backgroundValue && typeof backgroundValue === 'object') {
        featuredImage = backgroundValue.url || backgroundValue.source_url || backgroundValue?.sizes?.full || null
        featuredImageAlt = backgroundValue.alt || backgroundValue.alt_text || featuredImageAlt
      }
    }
  }
  // If hero image not resolved, try to extract featured image from embedded data
  if (!featuredImage) {
    featuredImage = extractFeaturedImage(item)
    featuredImageAlt = featuredImageAlt || item?._embedded?.['wp:featuredmedia']?.[0]?.alt_text || null
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
      const res = await fetch(`${attachmentUrl}?context=view`, NO_STORE ? { headers: { 'Accept': 'application/json' }, cache: 'no-store' } : { headers: { 'Accept': 'application/json' }, next: { revalidate: 60 } })
      
      if (res.ok) {
        const mediaData = await res.json()
        featuredImage = mediaData?.source_url || 
                       mediaData?.guid?.rendered || 
                       mediaData?.media_details?.sizes?.full?.source_url ||
                       null
        featuredImageAlt = mediaData?.alt_text || featuredImageAlt
      }
    } catch (e) {
      // Silent fail - will try other methods
    }
  }
  
  return {
    id: item.id,
    slug: item.slug,
    title: item.title?.rendered || '',
    // Read title/subtitle from the consolidated hero group first, fallback to legacy flat fields/meta
    customTitle: heroGroup?.titolo || item.acf?.titolo || item.meta?.titolo || null,
    subtitle: heroGroup?.sottotitolo || item.acf?.sottotitolo || item.meta?.sottotitolo || null,
    content: item.content?.rendered || '',
    image: featuredImage,
    imageAlt: featuredImageAlt || null,
    acf: item.acf || null,
  }
}

// Footer data from chi-siamo page ACF fields
export async function getFooterData() {
  try {
    const page = await getPageBySlug('chi-siamo', 30) // Cache for 30 seconds
    if (!page || !page.acf) {
      return {
        ctaData: {
          backgroundImage: '',
          title: '',
          buttonText: 'Contattaci Ora',
          buttonLink: '/contatti'
        },
        contactData: {
          email: '',
          phone: '',
          address: ''
        }
      }
    }

    const acf = page.acf

    // Get background image URL - prioritize legacy background field, then hero group
    let backgroundImageUrl = ''
    const heroGroup = acf.hero || null
    const backgroundValue = acf.background || heroGroup?.hero_image || heroGroup?.background
    
    if (backgroundValue) {
      if (typeof backgroundValue === 'number') {
        // It's a media ID, try to resolve to URL
        try {
          const attachmentUrl = `${API_BASE.replace('/wp-json/wp/v2', '')}/wp-json/wp/v2/media/${backgroundValue}?context=view`
          const res = await fetch(attachmentUrl, NO_STORE ? { headers: { 'Accept': 'application/json' }, cache: 'no-store' } : { headers: { 'Accept': 'application/json' }, next: { revalidate: 30 } })
          if (res.ok) {
            const mediaData = await res.json()
            backgroundImageUrl = mediaData?.source_url || mediaData?.guid?.rendered || ''
          }
        } catch (e) {
          console.log('Could not fetch footer background image:', e.message)
        }
      } else if (typeof backgroundValue === 'string') {
        if (/^https?:\/\//.test(backgroundValue) || backgroundValue.startsWith('/')) {
          backgroundImageUrl = backgroundValue
        }
      } else if (backgroundValue && typeof backgroundValue === 'object') {
        backgroundImageUrl = backgroundValue.url || backgroundValue.source_url || ''
      }
    }



    return {
      ctaData: {
        backgroundImage: backgroundImageUrl,
        title: acf.call_to_action || '',
        buttonText: 'Contattaci Ora',
        buttonLink: acf.bottone_cta || '/contatti'
      },
      contactData: {
        email: acf.email || '',
        phone: acf.telefono || '',
        address: acf.indirizzo || ''
      }
    }
  } catch (error) {
    console.error('Error fetching footer data:', error)
    return {
      ctaData: {
        backgroundImage: '',
        title: '',
        buttonText: 'Contattaci Ora',
        buttonLink: '/contatti'
      },
      contactData: {
        email: '',
        phone: '',
        address: ''
      }
    }
  }
}
