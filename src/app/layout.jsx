import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vento ADV',
  description: 'Web agency specializzata in soluzioni digitali innovative',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <Navigation />
        <main className="pt-20">{/* reserve space for fixed header */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}