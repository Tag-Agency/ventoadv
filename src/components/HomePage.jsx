'use client'

import { Play, ChevronRight, TrendingUp, Megaphone, Globe, Share2, ShoppingCart, Target } from 'lucide-react'
import { motion, LazyMotion, domAnimation, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import UiImage from '@/components/UiImage'
import { useRef, useState, useMemo } from 'react'
import ParticleNetwork from '@/components/ParticleNetwork'

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

export default function HomePage() {
  // Interactive gradient blob over services section
  const servicesRef = useRef(null)
  const [blobTransform, setBlobTransform] = useState('translate(-50%, -50%)')
  const reduceMotion = useReducedMotion()

  const handleServicesMouseMove = useMemo(() => (e) => {
    const rect = servicesRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const damp = 0.06 // movement sensitivity
    setBlobTransform(`translate(calc(-50% + ${dx * damp}px), calc(-50% + ${dy * damp}px))`)
  }, [])

  const handleServicesMouseLeave = useMemo(() => () => {
    setBlobTransform('translate(-50%, -50%)')
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      {/* Hero Section with Video */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ borderRadius: '0 0 48px 48px' }}>
        {/* Video Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: '0 0 48px 48px', overflow: 'hidden' }}>
          <video
            src="https://www.ventoadv.it/wp-content/uploads/2020/05/sfondo2.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={false}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8 }}
            style={{ opacity: 1 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Trasformiamo Idee in
              <span className="block text-primary">
                Esperienze Digitali
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Web agency specializzata in soluzioni digitali innovative per aziende che vogliono 
              distinguersi nel mondo online.
            </p>
            <div className="flex flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contatti"
                  className="inline-flex items-center bg-primary hover:bg-[#b89638] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold gap-2 transition-colors whitespace-nowrap"
                >
                  <Play className="w-5 h-5" />
                  Contattaci
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/portfolio"
                  className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors whitespace-nowrap"
                >
                  Portfolio
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll down anchor link */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex justify-center">
          <motion.a
            href="#services"
            className="flex flex-col items-center gap-3 text-white hover:text-primary transition-colors cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ y: 5 }}
          >
            <span className="text-lg font-semibold text-center">Scorri</span>
            <motion.div
              className="flex items-center justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="w-8 h-8 rotate-90" />
            </motion.div>
          </motion.a>
        </div>
        
        {/* Elliptical shadow below hero */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-[90%] h-8 pointer-events-none"
          style={{ 
            bottom: '-20px',
            background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 70%)',
            filter: 'blur(8px)',
            zIndex: 20
          }}
        />
      </section>

      {/* Services Preview */}
      <section
        id="services"
        ref={servicesRef}
        onMouseMove={handleServicesMouseMove}
        onMouseLeave={handleServicesMouseLeave}
        className="relative py-28 bg-white overflow-hidden"
      >
        {/* Light gray particle network background (full-width) */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork maxParticles={90} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              I Nostri Servizi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Offriamo soluzioni complete per la tua presenza digitale, dalla strategia alla realizzazione.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Link href={`/servizi/${service.id}`} key={service.id}>
                  <motion.div
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
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
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Portfolio Selezionato
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri alcuni dei nostri progetti più recenti e di successo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((index) => (
              <Link href={`/portfolio/${index}`} key={index}>
                <motion.div
                  className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative w-full h-64">
                    <UiImage
                      src={`https://placehold.co/600x400.png?text=Portfolio&bg=${index % 2 ? 'd2ad40' : '4f4f4f'}&fg=ffffff`}
                      alt="Portfolio"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-white">
                      <h4 className="text-xl font-semibold mb-2">Project Title</h4>
                      <p className="text-sm">Category</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}