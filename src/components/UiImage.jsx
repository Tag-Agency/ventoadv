import Image from 'next/image'
import { shimmerDataURL } from '@/lib/image'
import { useState, useCallback } from 'react'

// Site-wide Image with sensible defaults: blur-up placeholder and responsive sizes
export default function UiImage({
  alt,
  placeholder = 'blur',
  blurDataURL,
  sizes = '100vw',
  className,
  width,
  height,
  fill,
  quality = 75,
  onLoadingComplete,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)
  const blur = blurDataURL || shimmerDataURL(width || 700, height || 475)

  const handleComplete = useCallback((img) => {
    setLoaded(true)
    if (typeof onLoadingComplete === 'function') onLoadingComplete(img)
  }, [onLoadingComplete])

  const computedClass = `${className || ''} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`.trim()

  return (
    <Image
      alt={alt}
      placeholder={placeholder}
      blurDataURL={blur}
      sizes={sizes}
      className={computedClass}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      quality={quality}
      onLoadingComplete={handleComplete}
      {...rest}
    />
  )
}
