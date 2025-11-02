'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  
  const [ctaData, setCtaData] = useState({
    backgroundImage: '',
    title: '',
    buttonText: 'Contattaci Ora',
    buttonLink: '/contatti'
  })

  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    // Fetch ACF data from WordPress
    const fetchFooterData = async () => {
      try {
        const wpBase = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://work.tagagency.it/ventoadv'
        
        // Fetch chi-siamo page for footer CTA and contact data
        const response = await fetch(`${wpBase}/wp-json/wp/v2/pages?slug=chi-siamo`)
        if (response.ok) {
          const pages = await response.json()
          if (pages && pages.length > 0 && pages[0].acf) {
            const acf = pages[0].acf
            
            // Get background image URL from media ID
            let backgroundImageUrl = ''
            if (acf.background && typeof acf.background === 'number') {
              try {
                const mediaResponse = await fetch(`${wpBase}/wp-json/wp/v2/media/${acf.background}`)
                if (mediaResponse.ok) {
                  const mediaData = await mediaResponse.json()
                  backgroundImageUrl = mediaData.source_url || mediaData.guid?.rendered
                }
              } catch (e) {
                console.error('Error fetching background image:', e)
              }
            } else if (typeof acf.background === 'string') {
              backgroundImageUrl = acf.background
            } else if (acf.background && acf.background.url) {
              backgroundImageUrl = acf.background.url
            }
            
            setCtaData({
              backgroundImage: backgroundImageUrl,
              title: acf.call_to_action || '',
              buttonText: 'Contattaci Ora',
              buttonLink: acf.bottone_cta || '/contatti'
            })

            // Get contact data from the same page
            setContactData({
              email: acf.email || '',
              phone: acf.telefono || '',
              address: acf.indirizzo || ''
            })
          }
        }
      } catch (error) {
        console.error('Error fetching footer ACF data:', error)
      }
    }
    
    fetchFooterData()
  }, [])

  return (
    <footer className="bg-secondary text-white">
      {/* CTA Box con sfondo full width */}
      <div ref={containerRef} className="relative w-full overflow-hidden py-20">
        {/* Immagine di sfondo con zoom effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${ctaData.backgroundImage})`,
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
            {ctaData.title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href={ctaData.buttonLink}>
              <motion.button
                className="bg-primary hover:bg-[#b89638] text-white px-10 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {ctaData.buttonText}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer originale */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img 
                src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png" 
                alt="VentoADV Logo"
                className="h-8 w-auto mb-4"
              />
              <p className="text-gray-300 max-w-md">
                La tua web agency di fiducia per soluzioni digitali innovative e performanti.
              </p>
            </div>
            <div>
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
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Contatti</h3>
              <ul className="space-y-2 text-gray-300">
                {contactData.email && <li>{contactData.email}</li>}
                {contactData.phone && <li>{contactData.phone}</li>}
                {contactData.address && <li>{contactData.address}</li>}
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
