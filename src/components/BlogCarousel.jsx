"use client"

import { useRef } from 'react'
import Link from 'next/link'
import UiImage from '@/components/UiImage'
import { ArrowLeftCircle, ArrowRightCircle, Calendar } from 'lucide-react'
import { formatDateIT } from '@/lib/date'

export default function BlogCarousel({ items = [] }) {
  const scrollerRef = useRef(null)

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = Math.round(el.clientWidth * 0.85) * (dir === 'left' ? -1 : 1)
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  if (!items || items.length === 0) return null

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Altri articoli</h2>
        <div className="flex items-center gap-2">
          <button aria-label="Scorri a sinistra" onClick={() => scrollByAmount('left')} className="p-1 text-gray-500 hover:text-gray-800">
            <ArrowLeftCircle className="w-7 h-7" />
          </button>
          <button aria-label="Scorri a destra" onClick={() => scrollByAmount('right')} className="p-1 text-gray-500 hover:text-gray-800">
            <ArrowRightCircle className="w-7 h-7" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.primaryCategorySlug || 'senza-categoria'}/${post.slug}`}
            className="snap-start shrink-0 w-80"
          >
            <article className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative w-full h-44">
                {post.image ? (
                  <UiImage
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />)
                }
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="text-primary font-semibold truncate max-w-[60%]">{post.primaryCategoryName || 'Blog'}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDateIT(post.date)}</span>
                </div>
                <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3.25rem]">{post.title}</h3>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
