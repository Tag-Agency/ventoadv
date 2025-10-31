'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: "Come migliorare il SEO del tuo sito web nel 2024",
    excerpt: "Scopri le ultime tendenze e best practice per ottimizzare il tuo sito web e posizionarti meglio sui motori di ricerca.",
    date: "2024-01-15",
    category: "SEO",
    author: "Marco Bianchi",
    image: "https://placehold.co/600x400/d2ad40/ffffff?text=SEO+Article",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Le migliori strategie di marketing digitale per il 2024",
    excerpt: "Analisi delle strategie più efficaci per il marketing digitale nell'anno in corso, con case study e risultati reali.",
    date: "2024-02-10",
    category: "Marketing",
    author: "Giulia Rossi",
    image: "https://placehold.co/600x400/4f4f4f/ffffff?text=Marketing+Article",
    readTime: "8 min"
  },
  {
    id: 3,
    title: "Design responsivo: perché è fondamentale nel 2024",
    excerpt: "Tutto ciò che devi sapere sul design responsivo e come implementarlo per offrire un'esperienza utente ottimale su tutti i dispositivi.",
    date: "2024-03-05",
    category: "Web Design",
    author: "Alessandro Verdi",
    image: "https://placehold.co/600x400/d2ad40/ffffff?text=Design+Article",
    readTime: "6 min"
  },
  {
    id: 4,
    title: "Come scegliere la migliore piattaforma e-commerce per il tuo business",
    excerpt: "Guida completa per aiutarti a scegliere la piattaforma e-commerce perfetta per le tue esigenze specifiche e il tuo budget.",
    date: "2024-03-20",
    category: "Ecommerce",
    author: "Sofia Neri",
    image: "https://placehold.co/600x400/4f4f4f/ffffff?text=Ecommerce+Article",
    readTime: "7 min"
  }
]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-20 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri le ultime notizie, trend e consigli sul mondo del web, marketing digitale e design.
          </p>
        </div>

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
            {categories.map((category) => {
              const isActive = selectedCategory === category
              const label = category === 'all' ? 'Tutte' : category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  className={
                    `px-4 py-2 rounded-full text-sm font-medium transition-colors ` +
                    (isActive
                      ? 'bg-primary text-gray-900'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-100')
                  }
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-primary font-semibold">{post.category}</span>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString('it-IT')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Di {post.author}</span>
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nessun articolo trovato con i criteri selezionati.</p>
          </div>
        )}
      </div>
    </div>
  )
}