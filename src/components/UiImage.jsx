import Image from 'next/image'
import { shimmerDataURL } from '@/lib/image'

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
  ...rest
}) {
  const blur = blurDataURL || shimmerDataURL(width || 700, height || 475)
  return (
    <Image
      alt={alt}
      placeholder={placeholder}
      blurDataURL={blur}
      sizes={sizes}
      className={className}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      {...rest}
    />
  )
}
