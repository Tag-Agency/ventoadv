'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function FooterClient({ ctaData, contactData }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])



  // Fallback data if props are not provided
  const safeCta = ctaData || {
    backgroundImage: '',
    title: '',
    buttonText: 'Contattaci Ora',
    buttonLink: '/contatti'
  }

  const safeContact = contactData || {
    email: '',
    phone: '',
    address: ''
  }

  return (
    <footer className="text-white" style={{ backgroundColor: '#333333' }}>
      {/* CTA Box con sfondo full width */}
      <div ref={containerRef} className="relative w-full overflow-hidden py-20">
        {/* Immagine di sfondo con zoom effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: safeCta.backgroundImage ? `url(${safeCta.backgroundImage})` : 'none',
            scale
          }}
        />

        
        {/* Overlay scuro per migliorare la leggibilità */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Contenuto centrato */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {safeCta.title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href={safeCta.buttonLink}>
              <motion.button
                className="bg-primary hover:bg-[#b89638] text-white px-10 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {safeCta.buttonText}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer originale */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 text-center md:text-left">
              <img 
                src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png" 
                alt="VentoADV Logo"
                className="h-8 w-auto mb-4 hidden md:block"
              />
              <p className="text-gray-300 max-w-md mx-auto md:mx-0">
                La tua web agency di fiducia per soluzioni digitali innovative e performanti.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-primary">Servizi</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Marketing
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Web & Web Marketing
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Ecommerce
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4 text-primary">Contatti</h3>
              <ul className="space-y-2 text-gray-300">
                {safeContact.email && <li>{safeContact.email}</li>}
                {safeContact.phone && <li>{safeContact.phone}</li>}
                {safeContact.address && <li>{safeContact.address}</li>}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} WebAgency. Tutti i diritti riservati.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
