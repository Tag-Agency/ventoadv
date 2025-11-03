'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function ContactForm({ hasHero = false }) {
  return (
    <div className={hasHero ? "py-20 bg-white" : "py-20 bg-white"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hasHero && (
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contattaci</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Facciamo una chiacchierata
            </p>
          </div>
        )}
        
        <div className="text-center mb-12">
          <p className="text-2xl text-primary font-semibold">
            Chiamaci al <a href="tel:+393498680663" className="hover:underline">+39 349 868 0663</a>
          </p>
          <p className="text-xl text-gray-600 mt-2">oppure compila il form sotto</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Telefono</h3>
                  <p className="text-gray-600">
                    <a href="tel:+393498680663" className="hover:text-primary transition-colors">
                      +39 349 868 0663
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@ventoadv.it" className="hover:text-primary transition-colors">
                      info@ventoadv.it
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Indirizzo</h3>
                  <p className="text-gray-600">Via Giacomo Matteotti, 28<br />09170 Oristano</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Nome" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <input 
                type="text" 
                placeholder="Oggetto" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <textarea 
                rows="6" 
                placeholder="Messaggio" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              ></textarea>
              <motion.button
                type="submit"
                className="w-full bg-primary hover:bg-[#b89638] text-white py-4 rounded-lg text-lg font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Invia Messaggio
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
