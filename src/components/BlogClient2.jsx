"use client"

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import UiImage from '@/components/UiImage'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { formatDateIT } from '@/lib/date'

export default function BlogClient2({ posts = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const truncate = (text, max) => {
    if (!text) return ''
    if (text.length <= max) return text
    const slice = text.slice(0, max)
    // avoid breaking the last word if possible
    const lastSpace = slice.lastIndexOf(' ')
    const safe = lastSpace > max - 20 ? slice.slice(0, lastSpace) : slice
    return safe.trimEnd() + '…'
  }

  // Maps for categories
  const catById = useMemo(() => {
    const m = new Map()
    categories.forEach(c => m.set(c.id, { name: c.name, slug: c.slug }))
    return m
  }, [categories])

  const catIdBySlug = useMemo(() => {
    const m = new Map()
    categories.forEach(c => m.set(c.slug, c.id))
    return m
  }, [categories])

  // Filter pills from WP categories - show only "Tutte" and children of BLOG category
  const filterCategories = useMemo(() => {
    // Find BLOG category ID
    const blogCategory = categories.find(c => c.slug === 'blog')
    const blogCategoryId = blogCategory?.id
    
    // Filter only child categories of BLOG (and exclude BLOG itself)
    const blogChildCategories = categories.filter(c => 
      c.parent === blogCategoryId && c.slug !== 'blog'
    )
    
    return [
      { label: 'Tutte', slug: 'all' }, 
      ...blogChildCategories.map(c => ({ label: c.name, slug: c.slug }))
    ]
  }, [categories])

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    return posts.filter(p => {
      const matchesCategory = selectedCategory === 'all'
        ? (p.categories || []).includes(catIdBySlug.get('blog')) // Show only BLOG category when "all" is selected
        : (p.categories || []).includes(catIdBySlug.get(selectedCategory))
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [posts, catIdBySlug, selectedCategory, searchTerm])

  return (
    <div>
      {/* Search and Category Filters */}
      <div className="mb-8">
        {/* Full-width search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cerca articoli..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category buttons on a new row */}
        <div className="mt-4 flex flex-wrap gap-2">
          {filterCategories.map((c) => {
            const isActive = selectedCategory === c.slug
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setSelectedCategory(c.slug)}
                aria-pressed={isActive}
                className={
                  `px-4 py-2 rounded-full text-sm font-medium transition-colors ` +
                  (isActive
                    ? 'bg-primary text-gray-900'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100')
                }
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post) => {
          const primaryCategoryId = (post.categories || [])[0]
          const primaryCategorySlug = catById.get(primaryCategoryId)?.slug || 'senza-categoria'
          const primaryCategoryName = catById.get(primaryCategoryId)?.name || 'Senza categoria'
          return (
          <Link href={`/blog/${primaryCategorySlug}/${post.slug}`} key={post.id}>
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              whileHover={{ y: -5 }}
            >
              {post.image ? (
                <div className="relative w-full h-48">
                  <UiImage
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-200" />
              )}
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  {/* Show first category name if present */}
                  <span className="text-primary font-semibold">{primaryCategoryName}</span>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDateIT(post.date)}</span>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{truncate(post.title, 60)}</h3>
                {post.excerpt && <p className="text-gray-600 mb-4">{truncate(post.excerpt, 150)}</p>}
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{post.author ? `Di ${post.author}` : ''}</span>
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.div>
          </Link>
        )})}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Nessun articolo trovato con i criteri selezionati.</p>
        </div>
      )}
    </div>
  )
}
