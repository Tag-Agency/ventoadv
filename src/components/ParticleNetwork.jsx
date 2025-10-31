'use client'

import { useEffect, useRef } from 'react'

export default function ParticleNetwork({ color = 'rgba(229,231,235,0.95)', lineColor = 'rgba(229,231,235,0.35)', maxParticles = 80 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: null, y: null })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // adjust density on resize
      initParticles()
    }

    const initParticles = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const area = width * height
      const target = Math.min(maxParticles, Math.max(24, Math.floor(area / 15000)))
      const arr = []
      for (let i = 0; i < target; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: 1.2 + Math.random() * 1.6,
        })
      }
      particlesRef.current = arr
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouseRef.current.x = null
      mouseRef.current.y = null
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    resize()

    const step = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)

      // update and draw particles
      for (const p of particlesRef.current) {
        // mild mouse attraction
        const mx = mouseRef.current.x
        if (mx !== null) {
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < 220 * 220) {
            const f = 0.0007
            p.vx += dx * f
            p.vy += dy * f
          }
        }
        p.x += p.vx
        p.y += p.vy
        // soft bounds with bounce
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > width) { p.x = width; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > height) { p.y = height; p.vy *= -1 }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      // draw connections
      const maxDist = 120
      for (let i = 0; i < particlesRef.current.length; i++) {
        const a = particlesRef.current[i]
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const b = particlesRef.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < maxDist * maxDist) {
            const alpha = 1 - Math.sqrt(d2) / maxDist
            ctx.globalAlpha = Math.max(0.06, alpha * 0.35)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [color, lineColor, maxParticles])

  return (
    <canvas ref={canvasRef} className="w-full h-full" aria-hidden />
  )
}
