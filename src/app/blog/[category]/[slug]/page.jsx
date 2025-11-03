import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { shimmerDataURL } from '@/lib/image'
import ParallaxHero from '@/components/ParallaxHero'
import BlogCarousel from '@/components/BlogCarousel'
import { getPostBySlug, getPosts, getCategories } from '@/lib/wp'
import { formatDateIT } from '@/lib/date'

export const revalidate = 60

export default async function BlogPost({ params }) {
  const { category: categorySlug, slug } = params
  let post = null
  try {
    post = await getPostBySlug(slug)
  } catch (e) {
    post = null
  }

  if (!post) {
    return (
      <div className="py-20 bg-white max-w-3xl mx-auto px-4">Articolo non trovato</div>
    )
  }

  // Prepare related posts carousel
  let related = []
  try {
    const primaryCategoryId = post.categories?.[0]
    const [cats, rel] = await Promise.all([
      getCategories(),
      primaryCategoryId ? getPosts({ perPage: 10, category: primaryCategoryId }) : getPosts({ perPage: 10 })
    ])
    const catById = new Map(cats.map(c => [c.id, { slug: c.slug, name: c.name }]))
    related = (rel || [])
      .filter(p => p.id !== post.id)
      .slice(0, 8)
      .map(p => {
        const pcId = p.categories?.[0]
        const info = catById.get(pcId) || { slug: 'senza-categoria', name: 'Senza categoria' }
        return { ...p, primaryCategorySlug: info.slug, primaryCategoryName: info.name }
      })
  } catch (e) {
    related = []
  }

  return (
    <div className="bg-white">
      {post.image && (
        <ParallaxHero src={post.image} alt={post.title} height={350}>
          <div className="max-w-[60%] mx-auto">
            <h1
              className="text-white text-4xl sm:text-5xl lg:text-5xl font-bold text-center drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </div>
        </ParallaxHero>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/blog" className="flex items-center text-primary font-semibold mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Torna al Blog
        </Link>

        <div className="text-sm text-gray-500 mb-4">{formatDateIT(post.date)} · {post.readTime}</div>
        {post.author && <p className="text-gray-700 mb-6">Di {post.author}</p>}

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Related posts carousel */}
        {related.length > 0 && (
          <BlogCarousel items={related} />
        )}
      </div>
    </div>
  )
}
