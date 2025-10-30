// pages/about.js
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Users, Award } from 'lucide-react';
import { teamMembers } from '../lib/data';

export default function AboutPage() {
  return (
    <Layout hasBackground backgroundImage="https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Vento-ChiSiamo.jpg">
      {/* Small hero with title only (max 250px) */}
      <section className="relative h-[250px] max-h-[250px] flex items-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Chi Siamo</h1>
        </div>
      </section>

      {/* Content starts immediately after hero on white background */}
      <div className="bg-white">
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-lg text-gray-600 mb-6">
                  Siamo una web agency appassionata di tecnologia e design, specializzata nella creazione 
                  di esperienze digitali straordinarie per aziende ambiziose.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Con oltre 5 anni di esperienza nel settore, abbiamo aiutato decine di clienti a raggiungere 
                  i loro obiettivi digitali attraverso soluzioni innovative e su misura.
                </p>
                <div className="flex items-center space-x-4">
                  <Users className="w-8 h-8 text-[#d2ad40]" />
                  <span className="text-gray-600 font-semibold">Team di esperti dedicati</span>
                </div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-[#4f4f4f] to-[#d2ad40] rounded-xl h-96 flex items-center justify-center"
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
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-gray-200"
                  />
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-[#d2ad40] font-semibold">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}