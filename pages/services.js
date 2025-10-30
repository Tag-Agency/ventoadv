// pages/services.js
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { services } from '../lib/data';

export default function ServicesPage() {
  return (
    <Layout
      hasBackground
      backgroundImage="https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Lavori-Vento.jpg"
    >

      {/* Small hero with title only (max 250px) */}
      <section className="relative h-[250px] max-h-[250px] flex items-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">I Nostri Servizi</h1>
        </div>
      </section>

      <div className="bg-white">
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Offriamo soluzioni complete per la tua presenza digitale, dalla strategia alla realizzazione.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
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
        </div>
      </div>
    </Layout>
  );
}