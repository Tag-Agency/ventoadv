'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import UiImage from '@/components/UiImage'
import { shimmerDataURL } from '@/lib/image'
import { useState } from 'react'
import { Search, TrendingUp, Megaphone, Globe, Share2, ShoppingCart, Target } from 'lucide-react'

const services = [
  {
    id: 'marketing',
    title: "Marketing",
    description: "Strategie di marketing su misura per raggiungere i tuoi obiettivi commerciali.",
    image: "https://placehold.co/400x300.png?text=Marketing&bg=d2ad40&fg=ffffff",
    icon: TrendingUp
  },
  {
    id: 'advertising-branding',
    title: "Advertising & Branding",
    description: "Creazione di campagne pubblicitarie e identità di marca memorabili.",
    image: "https://placehold.co/400x300.png?text=Advertising&bg=4f4f4f&fg=ffffff",
    icon: Megaphone
  },
  {
    id: 'web-web-marketing',
    title: "Web & Web Marketing",
    description: "Siti web ottimizzati con strategie di marketing digitale integrate.",
    image: "https://placehold.co/400x300.png?text=Web+Marketing&bg=d2ad40&fg=ffffff",
    icon: Globe
  },
  {
    id: 'social-media-marketing',
    title: "Social Media Marketing",
    description: "Gestione e ottimizzazione dei canali social per aumentare il tuo engagement.",
    image: "https://placehold.co/400x300.png?text=Social+Media&bg=4f4f4f&fg=ffffff",
    icon: Share2
  },
  {
    id: 'ecommerce',
    title: "Ecommerce",
    description: "Piattaforme e-commerce complete con integrazione di pagamenti e logistica.",
    image: "https://placehold.co/400x300.png?text=Ecommerce&bg=d2ad40&fg=ffffff",
    icon: ShoppingCart
  },
  {
    id: 'lead-marketing',
    title: "Lead Marketing",
    description: "Strategie mirate per generare e convertire lead di qualità.",
    image: "https://placehold.co/400x300.png?text=Lead+Marketing&bg=4f4f4f&fg=ffffff",
    icon: Target
  }
]

export default function Servizi() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Use the service titles as filter categories
  const categories = ['all', ...services.map(s => s.title)]

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.title === selectedCategory
    const q = searchTerm.trim().toLowerCase()
    const matchesSearch = !q || service.title.toLowerCase().includes(q) || service.description.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">I Nostri Servizi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Offriamo soluzioni complete per la tua presenza digitale, dalla strategia alla realizzazione.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="mb-8">
          {/* Full-width search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cerca servizi..."
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
                  {category === 'all' ? 'Tutti' : category}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.id}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <Link href={`/servizi/${service.id}`}>
                  <div className="mb-6 inline-block p-4 bg-primary/10 rounded-lg">
                    <IconComponent className="w-12 h-12 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="relative w-full h-48 mb-4">
                    <UiImage
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nessun servizio trovato con i criteri selezionati.</p>
          </div>
        )}
      </div>
    </div>
  )
}