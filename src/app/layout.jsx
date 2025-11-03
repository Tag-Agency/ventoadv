import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getGlobalSettings } from '@/lib/wp'


const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Vento ADV',
  description: 'Web agency specializzata in soluzioni digitali innovative',
}

function hexToRgbTriplet(hex) {
  if (!hex || typeof hex !== 'string') return '0 0 0'
  const h = hex.replace('#', '').trim()
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const int = parseInt(full.slice(0, 6), 16)
  if (Number.isNaN(int)) return '0 0 0'
  const r = (int >> 16) & 255
  const g = (int >> 8) & 255
  const b = int & 255
  return `${r} ${g} ${b}`
}

export default async function RootLayout({ children }) {
  // Fetch global colors from WP (server-side)
  const globals = await getGlobalSettings().catch(() => null)
  const cssVars = {
    '--color-primary': hexToRgbTriplet(globals?.primary || '#d2ad40'),
    '--color-secondary': hexToRgbTriplet(globals?.secondary || '#4f4f4f'),
    '--color-white': hexToRgbTriplet(globals?.white || '#ffffff'),
  }
  return (
    <html lang="it">
      <head>
        {/* Preconnect to common WP hosts used for content */}
        <link rel="preconnect" href="https://work.tagagency.it" crossOrigin="" />
        <link rel="preconnect" href="https://www.ventoadv.it" crossOrigin="" />
        <link rel="dns-prefetch" href="//work.tagagency.it" />
        <link rel="dns-prefetch" href="//www.ventoadv.it" />
      </head>
      <body className={`${inter.className} ${poppins.variable}`} style={cssVars}>
        <Navigation />
        <main className="pt-20">{/* reserve space for fixed header */}
          {children}
        </main>
        <Footer />

      </body>
    </html>
  )
}