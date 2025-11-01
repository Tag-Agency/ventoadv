
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
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
  const servicesRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const pathname = usePathname()

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

  return (
    <LazyMotion features={domAnimation}>
      <header className="fixed top-0 w-full bg-secondary z-50 border-b border-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
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
            >
              HOME
            </Link>
            <Link 
              href="/chi-siamo"
              className={linkClasses('/chi-siamo')}
              prefetch={true}
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
                  className="absolute left-0 top-full mt-2 w-64 bg-secondary rounded-lg shadow-lg border border-primary z-50"
                  onMouseEnter={openDropdown}
                  onMouseLeave={() => scheduleCloseDropdown()}
                >
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/servizi/${service.id}`}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-primary hover:text-gray-900 transition-colors"
                      onClick={() => setIsServicesDropdownOpen(false)}
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
            >
              LAVORI
            </Link>
            <Link 
              href="/blog"
              className={linkClasses('/blog')}
              prefetch={false}
            >
              BLOG
            </Link>
          </nav>

          {/* Contact Button */}
          <Link 
            href="/contatti"
            className="hidden md:block bg-primary hover:bg-[#b89638] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            prefetch={true}
          >
            CONTATTACI
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-secondary border-t border-primary"
        >
          <div className="px-4 py-4 space-y-4">
            <Link 
              href="/"
              className={`block w-full text-left ${isActive('/') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link 
              href="/chi-siamo"
              className={`block w-full text-left ${isActive('/chi-siamo') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              CHI SIAMO
            </Link>
            <div className="relative">
              <button 
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className="flex items-center w-full text-left text-white"
              >
                SERVIZI
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <Link 
                href="/servizi"
                className={`block w-full text-left pl-4 py-2 ${isActive('/servizi') ? 'text-primary font-semibold' : 'text-white/80 hover:text-primary'} transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tutti i Servizi
              </Link>
              {isServicesDropdownOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/servizi/${service.id}`}
                      className="block w-full text-left pl-4 text-white hover:text-primary transition-colors"
                      onClick={() => {
                        setIsServicesDropdownOpen(false)
                        setIsMenuOpen(false)
                      }}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link 
              href="/portfolio"
              className={`block w-full text-left ${isActive('/portfolio') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              LAVORI
            </Link>
            <Link 
              href="/blog"
              className={`block w-full text-left ${isActive('/blog') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
              onClick={() => setIsMenuOpen(false)}
            >
              BLOG
            </Link>
            <Link 
              href="/contatti"
              className={`block w-full text-left ${isActive('/contatti') ? 'text-primary font-semibold' : 'text-white hover:text-primary'} transition-colors`}
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