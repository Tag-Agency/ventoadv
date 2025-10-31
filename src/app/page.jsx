import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import HomePage from '@/components/HomePage'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}