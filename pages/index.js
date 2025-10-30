// pages/index.js
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Play, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { services, portfolioItems } from '../lib/data';

export default function Home() {
  return (
    <Layout noPadding>
      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="https://www.ventoadv.it/wp-content/uploads/2020/05/sfondo2.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Trasformiamo Idee in
              <span className="block" style={{ color: '#d2ad40' }}>
                Esperienze Digitali
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Web agency specializzata in soluzioni digitali innovative per aziende che vogliono distinguersi nel mondo online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
                <Link href="/contact" passHref>
                  <motion.a
                    href="/contact"
                    className="bg-[#d2ad40] hover:bg-[#b89638] text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    role="button"
                  >
                    <Play className="w-5 h-5" />
                    Inizia Progetto
                  </motion.a>
                </Link>
                <Link href="/portfolio" passHref>
                  <motion.a
                    href="/portfolio"
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    role="button"
                  >
                    Scopri Portfolio
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </motion.a>
                </Link>
            </div>
          </motion.div>
        </div>
      </section>

  {/* Servizi preview */}
  <section className="py-12 bg-[#4f4f4f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">I Nostri Servizi</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Offriamo soluzioni complete per la tua presenza digitale, dalla strategia alla realizzazione.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <Link key={service.id} href={`/services/${service.id}`} passHref>
                <motion.div
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

  {/* Portfolio preview */}
  <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Portfolio Selezionato</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri alcuni dei nostri progetti più recenti e di successo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.slice(0, 2).map((item) => (
              <Link key={item.id} href={`/portfolio/${item.id}`} passHref>
                <motion.div
                  className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-white">
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}