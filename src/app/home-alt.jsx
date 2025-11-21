import { Play, ChevronRight, TrendingUp, Megaphone, Globe, Share2, ShoppingCart, Target } from 'lucide-react'
import { motion, LazyMotion, domAnimation } from 'framer-motion'
import Link from 'next/link'
import UiImage from '@/components/UiImage'
import { useState, useEffect, useRef } from 'react'

const services = [
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Strategie di marketing su misura.',
    icon: TrendingUp
  },
  {
    id: 'advertising-branding',
    title: 'Advertising & Branding',
    description: 'Campagne pubblicitarie e identità di marca.',
    icon: Megaphone
  },
  {
    id: 'web-web-marketing',
    title: 'Web & Web Marketing',
    description: 'Siti web ottimizzati con marketing digitale.',
    icon: Globe
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    description: 'Gestione canali social per engagement.',
    icon: Share2
  },
  {
    id: 'ecommerce',
    title: 'Ecommerce',
    description: 'Piattaforme e-commerce complete.',
    icon: ShoppingCart
  },
  {
    id: 'lead-marketing',
    title: 'Lead Marketing',
    description: 'Generazione e conversione lead.',
    icon: Target
  }
]

export default function HomeAlt() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothedMousePosition, setSmoothedMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Smooth mouse position updates
  useEffect(() => {
    const smoothMouse = () => {
      setSmoothedMousePosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }))
    }

    const animationFrame = requestAnimationFrame(function animate() {
      smoothMouse()
      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [mousePosition])

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10"
            animate={{
              background: `linear-gradient(to bottom right, rgba(184, 150, 56, ${0.1 + smoothedMousePosition.x * 0.00001}) 0%, rgba(147, 51, 234, ${0.05 + smoothedMousePosition.y * 0.000005}) 50%, rgba(59, 130, 246, ${0.1 + smoothedMousePosition.x * 0.000008}) 100%)`
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/20 to-primary/5"
            animate={{
              background: `linear-gradient(to top left, transparent 0%, rgba(255, 255, 255, ${0.2 + smoothedMousePosition.y * 0.00001}) 50%, rgba(184, 150, 56, ${0.05 + smoothedMousePosition.x * 0.000005}) 100%)`
            }}
            transition={{ duration: 0.7 }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${50 + smoothedMousePosition.x * 0.01}% ${50 + smoothedMousePosition.y * 0.01}%, transparent 0%, rgba(184, 150, 56, 0.03) 40%, rgba(147, 51, 234, 0.05) 100%)`
            }}
          />

          {/* Animated Lines */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
              animate={{
                x: smoothedMousePosition.x * 0.01,
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                x: { type: "spring", stiffness: 100, damping: 30 },
                opacity: { duration: 3, repeat: Infinity }
              }}
            />
            <motion.div
              className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"
              animate={{
                x: smoothedMousePosition.x * -0.008,
                opacity: [0.15, 0.4, 0.15]
              }}
              transition={{
                x: { type: "spring", stiffness: 80, damping: 25 },
                opacity: { duration: 4, repeat: Infinity, delay: 1 }
              }}
            />
            <motion.div
              className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
              animate={{
                y: smoothedMousePosition.y * 0.012,
                opacity: [0.25, 0.6, 0.25]
              }}
              transition={{
                y: { type: "spring", stiffness: 120, damping: 35 },
                opacity: { duration: 2.5, repeat: Infinity, delay: 0.5 }
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
              animate={{
                y: smoothedMousePosition.y * -0.01,
                opacity: [0.2, 0.45, 0.2]
              }}
              transition={{
                y: { type: "spring", stiffness: 90, damping: 28 },
                opacity: { duration: 3.5, repeat: Infinity, delay: 1.5 }
              }}
            />
          </div>

          {/* Mouse-following Gradient Orbs - Ultra Massive Coverage */}
          <motion.div
            className="absolute -top-80 -left-80 w-[1200px] h-[1200px] bg-gradient-to-r from-primary/40 to-purple-500/40 rounded-full blur-3xl"
            animate={{
              x: smoothedMousePosition.x * 0.25,
              y: smoothedMousePosition.y * 0.25,
              scale: [1, 1.08, 1],
              rotate: smoothedMousePosition.x * 0.05
            }}
            transition={{
              type: "spring",
              stiffness: 15,
              damping: 10,
              mass: 2,
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute -top-48 left-1/4 w-[1000px] h-[1000px] bg-gradient-to-r from-green-400/15 to-teal-500/15 rounded-full blur-3xl"
            animate={{
              x: smoothedMousePosition.x * 0.29,
              y: smoothedMousePosition.y * 0.29,
              scale: [1, 0.88, 1],
              rotate: smoothedMousePosition.x * -0.052
            }}
            transition={{
              type: "spring",
              stiffness: 17,
              damping: 11,
              mass: 2.0,
              scale: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
          />
          <motion.div
            className="absolute -top-64 -right-64 w-[1000px] h-[1000px] bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-3xl"
            animate={{
              x: smoothedMousePosition.x * 0.28,
              y: smoothedMousePosition.y * 0.28,
              scale: [1, 1.12, 1],
              rotate: smoothedMousePosition.x * 0.06
            }}
            transition={{
              type: "spring",
              stiffness: 18,
              damping: 8,
              mass: 1.8,
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute -bottom-64 -left-64 w-[1100px] h-[1100px] bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-full blur-3xl"
            animate={{
              x: smoothedMousePosition.x * -0.26,
              y: smoothedMousePosition.y * -0.26,
              scale: [1, 0.88, 1],
              rotate: smoothedMousePosition.y * -0.055
            }}
            transition={{
              type: "spring",
              stiffness: 16,
              damping: 11,
              mass: 2.2,
              scale: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1800px] h-[1800px] bg-gradient-to-r from-blue-500/25 to-primary/25 rounded-full blur-3xl"
            animate={{
              x: smoothedMousePosition.x * 0.22,
              y: smoothedMousePosition.y * 0.22,
              scale: [1, 1.15, 1],
              rotate: smoothedMousePosition.x * 0.028
            }}
            transition={{
              type: "spring",
              stiffness: 15,
              damping: 20,
              mass: 3,
              scale: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }
            }}
          />
          <motion.div
            className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-primary/20 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * -0.19,
              y: smoothedMousePosition.y * 0.14,
              scale: [1, 1.2, 1],
              rotate: smoothedMousePosition.y * 0.105
            }}
            transition={{
              x: { type: "spring", stiffness: 30, damping: 18 },
              y: { type: "spring", stiffness: 25, damping: 12 },
              scale: { duration: 9, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[850px] h-[850px] bg-gradient-to-tl from-blue-500/18 to-purple-500/18 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * 0.23,
              y: smoothedMousePosition.y * -0.17,
              scale: [1, 0.8, 1],
              rotate: smoothedMousePosition.x * -0.088
            }}
            transition={{
              x: { type: "spring", stiffness: 28, damping: 15 },
              y: { type: "spring", stiffness: 22, damping: 10 },
              scale: { duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
            }}
          />
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-primary/28 to-blue-500/28 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * 0.14,
              y: smoothedMousePosition.y * 0.19,
              scale: [1, 1.25, 1],
              rotate: smoothedMousePosition.y * 0.122
            }}
            transition={{
              type: "spring",
              stiffness: 35,
              damping: 20,
              mass: 1.5,
              scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-t from-purple-500/25 to-primary/25 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * -0.17,
              y: smoothedMousePosition.y * -0.15,
              scale: [1, 0.75, 1],
              rotate: smoothedMousePosition.x * -0.112
            }}
            transition={{
              type: "spring",
              stiffness: 32,
              damping: 18,
              mass: 1.7,
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-[650px] h-[650px] bg-gradient-to-bl from-blue-500/22 to-purple-500/22 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * 0.25,
              y: smoothedMousePosition.y * 0.23,
              scale: [1, 1.3, 1],
              rotate: smoothedMousePosition.x * 0.158
            }}
            transition={{
              type: "spring",
              stiffness: 38,
              damping: 22,
              mass: 1.3,
              scale: { duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-[680px] h-[680px] bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * -0.23,
              y: smoothedMousePosition.y * -0.20,
              scale: [1, 0.7, 1],
              rotate: smoothedMousePosition.y * -0.14
            }}
            transition={{
              type: "spring",
              stiffness: 36,
              damping: 20,
              mass: 1.4,
              scale: { duration: 11.5, repeat: Infinity, ease: "easeInOut", delay: 3.5 }
            }}
          />
          <motion.div
            className="absolute top-1/6 right-1/6 w-[550px] h-[550px] bg-gradient-to-br from-purple-500/15 to-primary/15 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * 0.30,
              y: smoothedMousePosition.y * 0.26,
              scale: [1, 1.35, 1],
              rotate: smoothedMousePosition.x * 0.192
            }}
            transition={{
              type: "spring",
              stiffness: 42,
              damping: 25,
              mass: 1.1,
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          />
          <motion.div
            className="absolute bottom-1/6 left-1/6 w-[580px] h-[580px] bg-gradient-to-tl from-blue-500/16 to-purple-500/16 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * -0.27,
              y: smoothedMousePosition.y * -0.24,
              scale: [1, 0.65, 1],
              rotate: smoothedMousePosition.y * -0.168
            }}
            transition={{
              type: "spring",
              stiffness: 40,
              damping: 23,
              mass: 1.2,
              scale: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }
            }}
          />
          <motion.div
            className="absolute -bottom-60 -right-60 w-[1000px] h-[1000px] bg-gradient-to-r from-blue-500/30 to-primary/30 rounded-full blur-3xl"
            animate={{
              x: smoothedMousePosition.x * -0.14,
              y: smoothedMousePosition.y * -0.14,
              scale: [1, 0.95, 1],
              rotate: smoothedMousePosition.y * -0.028
            }}
            transition={{
              type: "spring",
              stiffness: 25,
              damping: 20,
              mass: 2,
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
          />
          <motion.div
            className="absolute -top-48 -right-48 w-[750px] h-[750px] bg-gradient-to-r from-purple-500/25 to-blue-500/25 rounded-full blur-3xl"
            animate={{
              x: smoothedMousePosition.x * 0.21,
              y: smoothedMousePosition.y * 0.21,
              scale: [1, 1.1, 1],
              rotate: smoothedMousePosition.x * 0.053
            }}
            transition={{
              type: "spring",
              stiffness: 35,
              damping: 12,
              mass: 1.2,
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute -bottom-32 right-1/4 w-[950px] h-[950px] bg-gradient-to-l from-indigo-500/20 to-purple-600/20 rounded-full blur-3xl"
            animate={{
              x: smoothedMousePosition.x * -0.31,
              y: smoothedMousePosition.y * -0.31,
              scale: [1, 0.87, 1],
              rotate: smoothedMousePosition.y * 0.048
            }}
            transition={{
              type: "spring",
              stiffness: 16,
              damping: 10,
              mass: 2.1,
              scale: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-pink-500/20 to-orange-400/20 rounded-full blur-3xl"
            animate={{
              x: smoothedMousePosition.x * -0.24,
              y: smoothedMousePosition.y * -0.24,
              scale: [1, 0.85, 1],
              rotate: smoothedMousePosition.y * 0.038
            }}
            transition={{
              type: "spring",
              stiffness: 15,
              damping: 10,
              mass: 2.3,
              scale: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          />
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/15 to-primary/15 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * -0.12,
              y: smoothedMousePosition.y * 0.09,
              scale: [1, 1.15, 1],
              rotate: smoothedMousePosition.y * 0.07
            }}
            transition={{
              x: { type: "spring", stiffness: 40, damping: 20 },
              y: { type: "spring", stiffness: 35, damping: 15 },
              scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-gradient-to-tl from-blue-500/12 to-purple-500/12 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * 0.14,
              y: smoothedMousePosition.y * -0.11,
              scale: [1, 0.85, 1],
              rotate: smoothedMousePosition.x * -0.063
            }}
            transition={{
              x: { type: "spring", stiffness: 38, damping: 18 },
              y: { type: "spring", stiffness: 32, damping: 12 },
              scale: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
            }}
          />
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-primary/22 to-blue-500/22 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * 0.09,
              y: smoothedMousePosition.y * 0.12,
              scale: [1, 1.2, 1],
              rotate: smoothedMousePosition.y * 0.088
            }}
            transition={{
              type: "spring",
              stiffness: 45,
              damping: 22,
              mass: 1.3,
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-t from-purple-500/20 to-primary/20 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * -0.11,
              y: smoothedMousePosition.y * -0.10,
              scale: [1, 0.8, 1],
              rotate: smoothedMousePosition.x * -0.077
            }}
            transition={{
              type: "spring",
              stiffness: 42,
              damping: 20,
              mass: 1.4,
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-[450px] h-[450px] bg-gradient-to-bl from-blue-500/18 to-purple-500/18 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * 0.17,
              y: smoothedMousePosition.y * 0.15,
              scale: [1, 1.25, 1],
              rotate: smoothedMousePosition.x * 0.105
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 25,
              mass: 1,
              scale: { duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-[480px] h-[480px] bg-gradient-to-tr from-primary/16 to-blue-500/16 rounded-full blur-2xl"
            animate={{
              x: smoothedMousePosition.x * -0.15,
              y: smoothedMousePosition.y * -0.13,
              scale: [1, 0.75, 1],
              rotate: smoothedMousePosition.y * -0.098
            }}
            transition={{
              type: "spring",
              stiffness: 48,
              damping: 23,
              mass: 1.1,
              scale: { duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 3.5 }
            }}
          />

          <div className="relative max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                x: smoothedMousePosition.x * 0.005
              }}
              transition={{ duration: 0.8 }}
            >
              Trasformiamo Idee in
              <span className="block text-primary">Risultati Digitali</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                x: smoothedMousePosition.x * -0.003
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Web agency specializzata in soluzioni innovative per il tuo business online.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center bg-primary hover:bg-[#b89638] text-white px-8 py-4 rounded-lg font-semibold gap-2 transition-colors"
              >
                <Play className="w-5 h-5" />
                Iniziamo
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Vedi Portfolio
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">I Nostri Servizi</h2>
              <p className="text-lg text-gray-600">Soluzioni complete per la tua presenza digitale</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <motion.div
                    key={service.id}
                    className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link
                      href={`/servizi/${service.id}`}
                      className="text-primary hover:text-[#b89638] font-medium inline-flex items-center gap-1"
                    >
                      Scopri di più
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Pronto a iniziare il tuo progetto?</h2>
            <p className="text-xl mb-8 opacity-90">Contattaci per una consulenza gratuita e scopri come possiamo aiutarti.</p>
            <Link
              href="/contatti"
              className="inline-flex items-center bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold gap-2 transition-colors"
            >
              <Play className="w-5 h-5" />
              Contattaci Ora
            </Link>
          </div>
        </section>
      </div>
    </LazyMotion>
  )
}
