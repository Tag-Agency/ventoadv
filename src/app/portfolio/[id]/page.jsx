"use client"

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Fashion",
    category: "Web Design",
    description: "Piattaforma e-commerce completa per brand di moda italiana",
    image: "https://placehold.co/800x500/d2ad40/ffffff?text=Fashion+E-commerce",
  },
  {
    id: 2,
    title: "Corporate Website",
    category: "Sviluppo Web",
    description: "Sito istituzionale per azienda leader nel settore industriale",
    image: "https://placehold.co/800x500/4f4f4f/ffffff?text=Corporate+Site",
  }
]

export default function PortfolioDetail({ params }) {
  const id = Number(params.id)
  const item = portfolioItems.find(p => p.id === id)

  if (!item) return <div className="py-20 bg-white max-w-3xl mx-auto px-4">Progetto non trovato</div>

  return (
    <div className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/portfolio" className="flex items-center text-primary font-semibold mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Torna al Portfolio
        </Link>

        <img src={item.image} alt={item.title} className="w-full h-96 object-cover rounded-lg mb-6" />
        <span className="text-primary font-semibold">{item.category}</span>
        <h1 className="text-3xl font-bold mt-2 mb-4">{item.title}</h1>
        <p className="text-gray-700 mb-6">{item.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Tecnologie Utilizzate</h3>
            <p>Next.js, WordPress Headless, Stripe, Tailwind CSS</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Risultati</h3>
            <p>+150% conversioni, -40% bounce rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}
