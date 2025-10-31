// Lightweight shimmer placeholder for Next.js Image blur-up
const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#eeeeee" offset="20%" />
        <stop stop-color="#dddddd" offset="50%" />
        <stop stop-color="#eeeeee" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#eeeeee" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite"  />
  </svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const shimmerDataURL = (w = 700, h = 475) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`
