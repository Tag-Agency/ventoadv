"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { shimmerDataURL } from '@/lib/image'

/**
 * ParallaxHero
 * Props:
 * - src: string (required)
 * - alt: string (required)
 * - height: number (px) default 350
 * - overlayClassName: additional tailwind classes for overlay (optional)
 * - zoom: number (0 - 0.3) how much to scale on scroll, default 0.08 (8%)
 * - children: overlay content (e.g., title)
 * - kenBurns: boolean to enable slow pan/zoom animation (default: false)
 * - kenBurnsDuration: seconds for a full in-out cycle (default: 28)
 * - kenBurnsScale: max additional scale for Ken Burns (default: 1.08)
 */
export default function ParallaxHero({
  src,
  alt,
  height = 350,
  overlayClassName = '',
  zoom = 0.08,
  kenBurns = false,
  kenBurnsDuration = 28,
  kenBurnsScale = 1.08,
  children,
}) {
  const ref = useRef(null)
  // Scroll progress from when hero starts to when it leaves top
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  // Subtle zoom on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + Math.min(Math.max(zoom, 0), 0.3)])
  const hasImage = typeof src === 'string' && (src.startsWith('/') || /^https?:\/\//.test(src))

  return (
    <div ref={ref} className="parallax-hero relative w-full overflow-visible" style={{ height: 'var(--hero-h)', '--hero-h': `${height}px` }}>
      <style jsx>{`
        @media (max-width: 768px) {
          .parallax-hero { height: calc(var(--hero-h) * 0.6); }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '0 0 48px 48px' }}>
        <motion.div className="absolute inset-0 will-change-transform origin-center" style={{ scale }}>
          {hasImage ? (
            kenBurns ? (
              <div
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                  quality={60}
                  placeholder="blur"
                  blurDataURL={shimmerDataURL(1200, 500)}
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                quality={60}
                placeholder="blur"
                blurDataURL={shimmerDataURL(1200, 500)}
                loading="eager"
                decoding="async"
              />
            )
          ) : (
            <div className="absolute inset-0 bg-secondary/40" />
          )}
        </motion.div>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent ${overlayClassName}`} />
        <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-4">
          {children}
        </div>
      </div>
      {/* Elliptical shadow below hero */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-[90%] h-8 pointer-events-none"
        style={{ 
          bottom: '-20px',
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 70%)',
          filter: 'blur(8px)'
        }}
      />
    </div>
  )
}
