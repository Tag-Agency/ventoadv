
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { motion, LazyMotion, domAnimation } from 'framer-motion'

const services = [
  {
    id: 'marketing',
    title: "Marketing",
    description: "Strategie di marketing su misura per raggiungere i tuoi obiettivi commerciali.",
  },
  {
    id: 'advertising-branding',
    title: "Advertising & Branding",
    description: "Creazione di campagne pubblicitarie e identità di marca memorabili.",
  },
  {
    id: 'web-web-marketing',
    title: "Web & Web Marketing",
    description: "Siti web ottimizzati con strategie di marketing digitale integrate.",
  },
  {
    id: 'social-media-marketing',
    title: "Social Media Marketing",
    description: "Gestione e ottimizzazione dei canali social per aumentare il tuo engagement.",
  },
  {
    id: 'ecommerce',
    title: "Ecommerce",
    description: "Piattaforme e-commerce complete con integrazione di pagamenti e logistica.",
  },
  {
    id: 'lead-marketing',
    title: "Lead Marketing",
    description: "Strategie mirate per generare e convertire lead di qualità.",
  }
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const servicesRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const linkClasses = useCallback((href) =>
    `${isActive(href) ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`,
    [pathname]
  )

  const openDropdown = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setIsServicesDropdownOpen(true)
  }, [])

  const scheduleCloseDropdown = useCallback((delay = 300) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => setIsServicesDropdownOpen(false), delay)
  }, [])

  const handleLinkClick = useCallback((e, href) => {
    if (pathname !== href) {
      setIsLoading(true)
      // The loading will be stopped by the pathname useEffect
    }
  }, [pathname])

  // Close dropdown when clicking outside of the services area (desktop)
  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!servicesRef.current) return
      if (!servicesRef.current.contains(e.target)) {
        setIsServicesDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [])

  // Loading indicator on route changes
  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    // Listen to pathname changes
    handleComplete() // Reset loading state when pathname changes
    
    return () => {
      handleComplete()
    }
  }, [pathname])

  return (
    <LazyMotion features={domAnimation}>
      <header className="fixed top-0 w-full z-50 border-b shadow-md" style={{ backgroundColor: '#333333', borderColor: '#333333' }}>
        {/* Loading bar */}
        {isLoading && (
          <motion.div
            className="absolute top-0 left-0 h-1 bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ zIndex: 60 }}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Bar: burger left, logo center, contact right */}
          <div className="md:hidden h-16 flex items-center">
            <div className="w-1/3 flex items-center">
              <button 
                aria-label="Apri menù"
                className="inline-flex items-center justify-start"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
              </button>
            </div>
            <div className="w-1/3 flex justify-center">
              <Link href="/" className="inline-block group" prefetch={true}>
                <img 
                  src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png" 
                  alt="VentoADV Logo"
                  className="h-14 w-auto transition-transform duration-200 ease-out group-hover:scale-105"
                  loading="eager"
                />
              </Link>
            </div>
            <div className="w-1/3 flex justify-end">
              <Link 
                href="/contatti"
                prefetch={true}
                className="bg-primary hover:bg-[#b89638] text-white p-3 rounded-full transition-colors"
                aria-label="Contattaci"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Desktop Bar */}
          <div className="hidden md:flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/" className="inline-block group" prefetch={true}>
                <img 
                  src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png" 
                  alt="VentoADV Logo"
                  className="h-16 w-auto transition-transform duration-200 ease-out group-hover:scale-105"
                  loading="eager"
                />
              </Link>
            </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/"
              className={linkClasses('/')}
              prefetch={true}
              onClick={(e) => handleLinkClick(e, '/')}
            >
              HOME
            </Link>
            <Link 
              href="/chi-siamo"
              className={linkClasses('/chi-siamo')}
              prefetch={true}
              onClick={(e) => handleLinkClick(e, '/chi-siamo')}
            >
              CHI SIAMO
            </Link>
            <div 
              className="relative flex items-center gap-1 group"
              ref={servicesRef}
              onMouseEnter={openDropdown}
              onMouseLeave={() => scheduleCloseDropdown()}
              onFocus={openDropdown}
              onBlur={(e) => {
                // Close only if focus moved outside the services area
                if (!servicesRef.current?.contains(e.relatedTarget)) {
                  scheduleCloseDropdown()
                }
              }}
              aria-haspopup="true"
              aria-expanded={isServicesDropdownOpen}
            >
              <Link 
                href="/servizi"
                className={`${linkClasses('/servizi').replace('hover:text-primary','')} group-hover:text-primary`}
                prefetch={true}
                onClick={(e) => handleLinkClick(e, '/servizi')}
              >
                SERVIZI
              </Link>
              <ChevronDown className="w-4 h-4 text-white group-hover:text-primary transition-colors" aria-hidden="true" />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: isServicesDropdownOpen ? 1 : 0,
                    y: isServicesDropdownOpen ? 0 : -10,
                    display: isServicesDropdownOpen ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 w-64 rounded-lg shadow-lg border z-50"
                  style={{ backgroundColor: '#555555', borderColor: '#555555' }}
                  onMouseEnter={openDropdown}
                  onMouseLeave={() => scheduleCloseDropdown()}
                >
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/servizi/${service.id}`}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-primary hover:text-gray-900 transition-colors"
                      onClick={(e) => { 
                        setIsServicesDropdownOpen(false)
                        handleLinkClick(e, `/servizi/${service.id}`)
                      }}
                      prefetch={true}
                    >
                      {service.title}
                    </Link>
                  ))}
                </motion.div>
            </div>
            <Link 
              href="/portfolio"
              className={linkClasses('/portfolio')}
              prefetch={true}
              onClick={(e) => handleLinkClick(e, '/portfolio')}
            >
              LAVORI
            </Link>
            <Link 
              href="/blog"
              className={linkClasses('/blog')}
              prefetch={false}
              onClick={(e) => handleLinkClick(e, '/blog')}
            >
              BLOG
            </Link>
          </nav>

          {/* Desktop Contact Button */}
          <Link 
            href="/contatti"
            className="hidden md:block bg-primary hover:bg-[#b89638] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            onClick={(e) => handleLinkClick(e, '/contatti')}
            prefetch={true}
          >
            CONTATTACI
          </Link>
          </div>
        </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t"
          style={{ backgroundColor: '#555555', borderColor: '#555555' }}
        >
          <div className="px-4 py-4">
            <Link 
              href="/"
              className={`block w-full text-left py-3 ${isActive('/') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <div className="border-t" style={{ borderColor: '#999999' }}></div>
            <Link 
              href="/chi-siamo"
              className={`block w-full text-left py-3 ${isActive('/chi-siamo') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              CHI SIAMO
            </Link>
            <div className="border-t" style={{ borderColor: '#999999' }}></div>
            <Link 
              href="/servizi"
              className={`block w-full text-left py-3 ${isActive('/servizi') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              SERVIZI
            </Link>
            <div className="border-t" style={{ borderColor: '#999999' }}></div>
            <Link 
              href="/portfolio"
              className={`block w-full text-left py-3 ${isActive('/portfolio') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              LAVORI
            </Link>
            <div className="border-t" style={{ borderColor: '#999999' }}></div>
            <Link 
              href="/blog"
              className={`block w-full text-left py-3 ${isActive('/blog') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              BLOG
            </Link>
            <div className="border-t" style={{ borderColor: '#999999' }}></div>
            <Link 
              href="/contatti"
              className={`block w-full text-left py-3 ${isActive('/contatti') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              CONTATTACI
            </Link>
          </div>
        </motion.div>
      )}
    </header>
    </LazyMotion>
  )
}