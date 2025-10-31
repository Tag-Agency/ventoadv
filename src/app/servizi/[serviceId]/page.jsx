'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'marketing',
    title: "Marketing",
    description: "Strategie di marketing su misura per raggiungere i tuoi obiettivi commerciali.",
    details: "Il nostro approccio al marketing si basa su analisi dati, creatività e risultati misurabili. Creiamo strategie personalizzate che generano lead qualificati e aumentano le conversioni.",
    image: "https://placehold.co/400x300/d2ad40/ffffff?text=Marketing+Strategy"
  },
  {
    id: 'advertising-branding',
    title: "Advertising & Branding",
    description: "Creazione di campagne pubblicitarie e identità di marca memorabili.",
    details: "Dall'ideazione alla realizzazione, creiamo campagne pubblicitarie che catturano l'attenzione e costruiscono identità di marca forti e riconoscibili.",
    image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Branding+Campaign"
  },
  {
    id: 'web-web-marketing',
    title: "Web & Web Marketing",
    description: "Siti web ottimizzati con strategie di marketing digitale integrate.",
    details: "Sviluppiamo siti web performanti con strategie di web marketing integrate per massimizzare la visibilità online e generare risultati tangibili.",
    image: "https://placehold.co/400x300/d2ad40/ffffff?text=Web+Marketing"
  },
  {
    id: 'social-media-marketing',
    title: "Social Media Marketing",
    description: "Gestione e ottimizzazione dei canali social per aumentare il tuo engagement.",
    details: "Creiamo e gestiamo strategie social media efficaci che aumentano il coinvolgimento, ampliano la tua audience e generano lead di qualità.",
    image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Social+Media"
  },
  {
    id: 'ecommerce',
    title: "Ecommerce",
    description: "Piattaforme e-commerce complete con integrazione di pagamenti e logistica.",
    details: "Progettiamo e sviluppiamo piattaforme e-commerce complete, sicure e performanti, con integrazioni avanzate per pagamenti, logistica e CRM.",
    image: "https://placehold.co/400x300/d2ad40/ffffff?text=Ecommerce+Platform"
  },
  {
    id: 'lead-marketing',
    title: "Lead Marketing",
    description: "Strategie mirate per generare e convertire lead di qualità.",
    details: "Implementiamo funnel di conversione ottimizzati che trasformano i visitatori in clienti attraverso strategie di lead nurturing e automazione.",
    image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Lead+Generation"
  }
]

export default function ServicePage({ params }) {
  const service = services.find(s => s.id === params.serviceId)

  if (!service) {
    return <div>Service not found</div>
  }

  return (
    <div className="py-20 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/servizi"
            className="flex items-center text-primary font-semibold mb-8 hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Torna ai Servizi
          </Link>
        </motion.div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{service.description}</p>
          <p className="text-gray-700 text-lg">{service.details}</p>
        </div>

        <div className="mb-12">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Perché Scegliere il Nostro {service.title}?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Approccio Personalizzato</h3>
              <p className="text-gray-600">Ogni strategia viene sviluppata su misura per le tue esigenze specifiche.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Risultati Misurabili</h3>
              <p className="text-gray-600">Monitoriamo costantemente le performance per ottimizzare i risultati.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Team di Esperti</h3>
              <p className="text-gray-600">Professionisti specializzati con anni di esperienza nel settore.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Supporto Continuo</h3>
              <p className="text-gray-600">Assistenza dedicata prima, durante e dopo la realizzazione del progetto.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}