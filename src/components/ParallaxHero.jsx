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
  // Move image slower than scroll for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -height * 0.25])
  // Subtle zoom on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + Math.min(Math.max(zoom, 0), 0.3)])

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: `${height}px` }}>
      <motion.div className="absolute inset-0 will-change-transform origin-center" style={{ y, scale }}>
        {kenBurns ? (
          <motion.div
            className="absolute inset-0 will-change-transform"
            initial={{ scale: 1.0, x: '-2%', y: '2%' }}
            animate={{ scale: kenBurnsScale, x: '2%', y: '-2%' }}
            transition={{ duration: kenBurnsDuration, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL={shimmerDataURL(1200, 500)}
            />
          </motion.div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={shimmerDataURL(1200, 500)}
          />
        )}
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent ${overlayClassName}`} />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  )
}
