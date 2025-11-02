'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, TrendingUp, Megaphone, Globe, Share2, ShoppingCart, Target } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'marketing',
    title: "Marketing",
    description: "Strategie di marketing su misura per raggiungere i tuoi obiettivi commerciali.",
    icon: TrendingUp
  },
  {
    id: 'advertising-branding',
    title: "Advertising & Branding",
    description: "Creazione di campagne pubblicitarie e identità di marca memorabili.",
    icon: Megaphone
  },
  {
    id: 'web-web-marketing',
    title: "Web & Web Marketing",
    description: "Siti web ottimizzati con strategie di marketing digitale integrate.",
    icon: Globe
  },
  {
    id: 'social-media-marketing',
    title: "Social Media Marketing",
    description: "Gestione e ottimizzazione dei canali social per aumentare il tuo engagement.",
    icon: Share2
  },
  {
    id: 'ecommerce',
    title: "Ecommerce",
    description: "Piattaforme e-commerce complete con integrazione di pagamenti e logistica.",
    icon: ShoppingCart
  },
  {
    id: 'lead-marketing',
    title: "Lead Marketing",
    description: "Strategie mirate per generare e convertire lead di qualità.",
    icon: Target
  }
]

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const autoPlayRef = useRef(null)
  const containerRef = useRef(null)

  const gap = 24 // gap-6 = 1.5rem = 24px
  const maxIndex = Math.max(0, services.length - slidesPerView)

  // Detect screen size and update slidesPerView
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(2) // Mobile: 2 cards
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2) // Tablet: 2 cards
      } else {
        setSlidesPerView(3) // Desktop: 3 cards
      }
    }
    
    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  // Calculate container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    // Initial measurement with a small delay to ensure layout is complete
    const timer = setTimeout(updateWidth, 100)
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
    }
  }

  // Auto-play every 5 seconds
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [maxIndex, slidesPerView])

  // Reset auto-play on manual interaction
  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex(prev => {
        const newMaxIndex = Math.max(0, services.length - slidesPerView)
        return prev >= newMaxIndex ? 0 : prev + 1
      })
    }, 5000)
  }

  const handlePrev = () => {
    prevSlide()
    resetAutoPlay()
  }

  const handleNext = () => {
    nextSlide()
    resetAutoPlay()
  }

  // Calculate card width and slide offset
  const cardWidth = containerWidth > 0 ? (containerWidth - gap * (slidesPerView - 1)) / slidesPerView : 0
  const slideOffset = -(currentIndex * (cardWidth + gap))

  return (
    <section className="pt-12 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            I Nostri Servizi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri come possiamo aiutarti a raggiungere i tuoi obiettivi digitali.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-[60] bg-white rounded-full p-3 shadow-lg transition-all ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary hover:text-white'
            }`}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-[60] bg-white rounded-full p-3 shadow-lg transition-all ${
              currentIndex >= maxIndex ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary hover:text-white'
            }`}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div ref={containerRef} className="overflow-x-hidden overflow-y-visible py-8">
            <motion.div
              className="flex gap-6"
              animate={{ x: slideOffset }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {services.map((service) => {
                const IconComponent = service.icon
                return (
                  <Link
                    href={`/servizi/${service.id}`}
                    key={service.id}
                    className="flex-shrink-0 relative z-50"
                    style={{ width: cardWidth > 0 ? `${cardWidth}px` : 'auto' }}
                  >
                    <motion.div
                      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full text-center"
                      style={{ lineHeight: '1.1em' }}
                      whileHover={{ y: -8 }}
                    >
                      <div className="mb-6 inline-block p-4 bg-primary/10 rounded-lg">
                        <IconComponent className="w-10 h-10 text-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </motion.div>
                  </Link>
                )
              })}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx)
                  resetAutoPlay()
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
