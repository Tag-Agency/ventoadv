// pages/blog.js
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../lib/data';

export default function BlogPage() {
  return (
    <Layout hasBackground backgroundImage="https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Lavori-Vento.jpg">

      {/* Small hero with title only (max 250px) */}
      <section className="relative h-[250px] max-h-[250px] flex items-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Blog</h1>
        </div>
      </section>

      <div className="bg-white">
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Scopri le ultime notizie, trend e consigli sul mondo del web, marketing digitale e design.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} passHref legacyBehavior>
                  <motion.a
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer block"
                    whileHover={{ y: -5 }}
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-[#d2ad40] font-semibold">{post.category}</span>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Di {post.author}</span>
                        <span className="text-[#d2ad40]">→</span>
                      </div>
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