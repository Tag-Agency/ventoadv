// pages/portfolio.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import { portfolioItems } from '../lib/data';

export default function PortfolioPage() {
  return (
    <Layout hasBackground backgroundImage="https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Lavori-Vento.jpg">

      {/* Small hero with title only (max 250px) */}
      <section className="relative h-[250px] max-h-[250px] flex items-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Portfolio</h1>
        </div>
      </section>

      <div className="bg-white">
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Scopri i nostri progetti più recenti e di successo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <Link key={item.id} href={`/portfolio/${item.id}`} passHref legacyBehavior>
                  <motion.a
                    className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white block"
                    whileHover={{ y: -5 }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <span className="text-[#d2ad40] font-semibold">{item.category}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}