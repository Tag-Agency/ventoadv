"use client"

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: "Come migliorare il SEO del tuo sito web nel 2024",
    excerpt: "Scopri le ultime tendenze e best practice per ottimizzare il tuo sito web e posizionarti meglio sui motori di ricerca.",
    date: "2024-01-15",
    category: "SEO",
    author: "Marco Bianchi",
    image: "https://placehold.co/600x400/d2ad40/ffffff?text=SEO+Article",
    readTime: "5 min",
    content: "<p>Contenuto dell'articolo di esempio.</p>"
  },
  {
    id: 2,
    title: "Le migliori strategie di marketing digitale per il 2024",
    excerpt: "Analisi delle strategie più efficaci per il marketing digitale nell'anno in corso, con case study e risultati reali.",
    date: "2024-02-10",
    category: "Marketing",
    author: "Giulia Rossi",
    image: "https://placehold.co/600x400/4f4f4f/ffffff?text=Marketing+Article",
    readTime: "8 min",
    content: "<p>Contenuto dell'articolo di esempio 2.</p>"
  }
]

export default function BlogPost({ params }) {
  const id = Number(params.id)
  const post = blogPosts.find(p => p.id === id)

  if (!post) return (
    <div className="py-20 bg-white mt-20 max-w-3xl mx-auto px-4">Articolo non trovato</div>
  )

  return (
    <div className="py-20 bg-white mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="flex items-center text-primary font-semibold mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Torna al Blog
        </Link>

        <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-lg mb-6" />
        <div className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()} · {post.readTime}</div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-6">Di {post.author}</p>

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
}
