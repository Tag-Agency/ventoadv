'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import UiImage from '@/components/UiImage'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import ParallaxHero from '@/components/ParallaxHero'
import { getPageBySlug } from '@/lib/wp'

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Fashion",
    category: "Web Design",
    description: "Piattaforma e-commerce completa per brand di moda italiana",
    image: "https://placehold.co/400x300.png?text=Fashion+E-commerce&bg=d2ad40&fg=ffffff"
  },
  {
    id: 2,
    title: "Corporate Website",
    category: "Sviluppo Web",
    description: "Sito istituzionale per azienda leader nel settore industriale",
    image: "https://placehold.co/400x300.png?text=Corporate+Site&bg=4f4f4f&fg=ffffff"
  },
  {
    id: 3,
    title: "Brand Identity",
    category: "Branding",
    description: "Rinnovamento completo dell'identità visiva per startup tech",
    image: "https://placehold.co/400x300.png?text=Brand+Identity&bg=d2ad40&fg=ffffff"
  },
  {
    id: 4,
    title: "Mobile App",
    category: "Sviluppo Web",
    description: "Applicazione mobile per servizio di delivery food",
    image: "https://placehold.co/400x300.png?text=Mobile+App&bg=4f4f4f&fg=ffffff"
  }
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const pageData = await getPageBySlug('portfolio')
        setPage(pageData)
      } catch (e) {
        console.error('Failed to fetch Portfolio page:', e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPage()
  }, [])

  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))]

  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const q = searchTerm.trim().toLowerCase()
    const matchesSearch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  const heroImage = page?.image
  const heroAlt = page?.imageAlt || page?.title || 'Portfolio'

  return (
    <div className="bg-white">
      <ParallaxHero src={heroImage} alt={heroAlt} height={450}>
        <div className="text-center max-w-[60%] mx-auto">
          {!isLoading && page?.customTitle ? (
            <h1
              className="text-white text-4xl sm:text-5xl lg:text-5xl font-bold drop-shadow-md mb-4"
              dangerouslySetInnerHTML={{ __html: page.customTitle }}
            />
          ) : (
            <h1 className="text-white text-4xl sm:text-5xl lg:text-5xl font-bold drop-shadow-md mb-4">
              Portfolio
            </h1>
          )}
          {!isLoading && page?.subtitle && (
            <h2
              className="text-primary text-xl sm:text-2xl lg:text-3xl font-semibold drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: page.subtitle }}
            />
          )}
        </div>
      </ParallaxHero>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <div className="relative w-full h-64">
                    <UiImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
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
    </div>
  )
}