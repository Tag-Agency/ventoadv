 'use client'

import { Play, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    id: 'marketing',
    title: "Marketing",
    description: "Strategie di marketing su misura per raggiungere i tuoi obiettivi commerciali.",
    image: "https://placehold.co/400x300/d2ad40/ffffff?text=Marketing"
  },
  {
    id: 'advertising-branding',
    title: "Advertising & Branding",
    description: "Creazione di campagne pubblicitarie e identità di marca memorabili.",
    image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Advertising"
  },
  {
    id: 'web-web-marketing',
    title: "Web & Web Marketing",
    description: "Siti web ottimizzati con strategie di marketing digitale integrate.",
    image: "https://placehold.co/400x300/d2ad40/ffffff?text=Web+Marketing"
  },
  {
    id: 'social-media-marketing',
    title: "Social Media Marketing",
    description: "Gestione e ottimizzazione dei canali social per aumentare il tuo engagement.",
    image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Social+Media"
  },
  {
    id: 'ecommerce',
    title: "Ecommerce",
    description: "Piattaforme e-commerce complete con integrazione di pagamenti e logistica.",
    image: "https://placehold.co/400x300/d2ad40/ffffff?text=Ecommerce"
  },
  {
    id: 'lead-marketing',
    title: "Lead Marketing",
    description: "Strategie mirate per generare e convertire lead di qualità.",
    image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Lead+Marketing"
  }
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Video */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            src="https://www.ventoadv.it/wp-content/uploads/2020/05/sfondo2.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contatti"
                  className="inline-flex items-center bg-primary hover:bg-[#b89638] text-white px-8 py-4 rounded-lg text-lg font-semibold gap-2 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Inizia Progetto
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/portfolio"
                  className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  Scopri Portfolio
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              I Nostri Servizi
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Offriamo soluzioni complete per la tua presenza digitale, dalla strategia alla realizzazione.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link href={`/servizi/${service.id}`} key={service.id}>
                <motion.div
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              </Link>
            ))}
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
                  <img 
                    src={`https://placehold.co/600x400/${index % 2 ? 'd2ad40' : '4f4f4f'}/ffffff?text=Portfolio`}
                    alt="Portfolio"
                    className="w-full h-64 object-cover"
                  />
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
    </>
  )
}