'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Search } from 'lucide-react'

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Fashion",
    category: "Web Design",
    description: "Piattaforma e-commerce completa per brand di moda italiana",
    image: "https://placehold.co/400x300/d2ad40/ffffff?text=Fashion+E-commerce"
  },
  {
    id: 2,
    title: "Corporate Website",
    category: "Sviluppo Web",
    description: "Sito istituzionale per azienda leader nel settore industriale",
    image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Corporate+Site"
  },
  {
    id: 3,
    title: "Brand Identity",
    category: "Branding",
    description: "Rinnovamento completo dell'identità visiva per startup tech",
    image: "https://placehold.co/400x300/d2ad40/ffffff?text=Brand+Identity"
  },
  {
    id: 4,
    title: "Mobile App",
    category: "Sviluppo Web",
    description: "Applicazione mobile per servizio di delivery food",
    image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Mobile+App"
  }
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))]

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const q = searchTerm.trim().toLowerCase()
    const matchesSearch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })
  return (
    <div className="py-20 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri i nostri progetti più recenti e di successo.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="mb-8">
          {/* Full-width search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cerca progetti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category buttons on a new row */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category
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
                  {category === 'all' ? 'Tutte' : category}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Link href={`/portfolio/${item.id}`} key={item.id}>
              <motion.div
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white">
                  <span className="text-primary font-semibold">{item.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nessun progetto trovato con i criteri selezionati.</p>
          </div>
        )}
      </div>
    </div>
  )
}