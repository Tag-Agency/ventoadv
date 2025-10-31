import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

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

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        {/* Preconnect to common WP hosts used for content */}
        <link rel="preconnect" href="https://work.tagagency.it" crossOrigin="" />
      </head>
      <body className={`${inter.className} ${poppins.variable}`}>
        <Navigation />
        <main className="pt-20">{/* reserve space for fixed header */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}