'use client'

import { motion } from 'framer-motion'
import { Users, Award } from 'lucide-react'

const teamMembers = [
  {
    name: "Marco Bianchi",
    role: "CEO & Founder",
    image: "https://placehold.co/300x300/4f4f4f/ffffff?text=Marco+Bianchi"
  },
  {
    name: "Giulia Rossi",
    role: "Creative Director",
    image: "https://placehold.co/300x300/d2ad40/ffffff?text=Giulia+Rossi"
  },
  {
    name: "Alessandro Verdi",
    role: "Tech Lead",
    image: "https://placehold.co/300x300/4f4f4f/ffffff?text=Alessandro+Verdi"
  },
  {
    name: "Sofia Neri",
    role: "Marketing Manager",
    image: "https://placehold.co/300x300/d2ad40/ffffff?text=Sofia+Neri"
  }
]

export default function ChiSiamo() {
  return (
    <div className="py-20 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Chi Siamo</h1>
            <p className="text-lg text-gray-600 mb-6">
              Siamo una web agency appassionata di tecnologia e design, specializzata nella creazione 
              di esperienze digitali straordinarie per aziende ambiziose.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Con oltre 5 anni di esperienza nel settore, abbiamo aiutato decine di clienti a raggiungere 
              i loro obiettivi digitali attraverso soluzioni innovative e su misura.
            </p>
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-primary" />
              <span className="text-gray-700 font-semibold">Team di esperti dedicati</span>
            </div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-secondary to-primary rounded-xl h-96 flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Award className="w-24 h-24 text-white" />
          </motion.div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Il Nostro Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img 
                src={member.image} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-primary font-semibold">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}