import BlogClient2 from '@/components/BlogClient2'
import ParallaxHero from '@/components/ParallaxHero'
import { getCategories, getPosts, getPageBySlug } from '@/lib/wp'

const fallbackPosts = [
  {
    id: 1,
    slug: 'articolo-di-esempio',
    title: 'Esempio articolo (WP non configurato)',
    excerpt: 'Configura NEXT_PUBLIC_WP_API_URL per caricare articoli reali da WordPress.',
    date: '2024-01-15',
    categories: [],
    image: 'https://placehold.co/600x400.png?text=Blog&bg=d2ad40&fg=ffffff',
    readTime: '3 min',
  }
]

export default async function Blog() {
  let posts = []
  let categories = []
  let page = null
  
  try {
    posts = await getPosts({ perPage: 12 })
    categories = await getCategories()
    page = await getPageBySlug('blog')
  } catch (e) {
    posts = fallbackPosts
    categories = []
  }

  const heroImage = page?.image
  const heroAlt = page?.imageAlt || page?.title || 'Blog'

  return (
    <div className="bg-white">
  <ParallaxHero src={heroImage} alt={heroAlt} height={450}>
        <div className="text-center">
          {page?.customTitle && (
            <h1
              className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-md mb-4"
              dangerouslySetInnerHTML={{ __html: page.customTitle }}
            />
          )}
          {page?.subtitle && (
            <h2
              className="text-primary text-xl sm:text-2xl lg:text-3xl font-semibold drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: page.subtitle }}
            />
          )}
        </div>
      </ParallaxHero>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogClient2 posts={posts} categories={categories} />
        </div>
      </div>
    </div>
  )
}

// Revalidate the blog page periodically to keep content fresh
export const revalidate = 60