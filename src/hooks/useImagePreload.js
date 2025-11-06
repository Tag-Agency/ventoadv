"use client"

import { useEffect } from 'react'

/**
 * Preload hero images for faster loading
 * @param {string} src - Image source URL
 * @param {boolean} priority - Whether to preload immediately
 */
export function useImagePreload(src, priority = true) {
  useEffect(() => {
    if (!src || !priority || typeof window === 'undefined') return

    // Create preload link
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    link.fetchPriority = 'high'
    
    // Add to head
    document.head.appendChild(link)
    
    // Cleanup
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [src, priority])
}

/**
 * Preload multiple images
 * @param {string[]} sources - Array of image URLs
 */
export function useMultipleImagePreload(sources = []) {
  useEffect(() => {
    if (!sources.length || typeof window === 'undefined') return

    const links = sources
      .filter(Boolean)
      .map(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        link.fetchPriority = 'high'
        document.head.appendChild(link)
        return link
      })
    
    // Cleanup
    return () => {
      links.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      })
    }
  }, [sources])
}