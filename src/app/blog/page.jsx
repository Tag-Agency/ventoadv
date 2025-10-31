import BlogClient2 from '@/components/BlogClient2'
import { getCategories, getPosts } from '@/lib/wp'

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
  try {
    posts = await getPosts({ perPage: 12 })
    categories = await getCategories()
  } catch (e) {
    posts = fallbackPosts
    categories = []
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri le ultime notizie, trend e consigli sul mondo del web, marketing digitale e design.
          </p>
        </div>
  <BlogClient2 posts={posts} categories={categories} />
      </div>
    </div>
  )
}

// Revalidate the blog page periodically to keep content fresh
export const revalidate = 60