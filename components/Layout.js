// components/Layout.js
import { useState } from 'react';
import { Menu, X, ChevronDown, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { services } from '../lib/data';

export default function Layout({ children, hasBackground = false, backgroundImage = null, noPadding = false }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const currentPage = router.pathname;

  // Mappa i path di Next.js ai nomi usati nel tuo vecchio sistema (se necessario)
  const getPageName = () => {
    if (currentPage === '/') return 'home';
    if (currentPage.startsWith('/services/')) return currentPage.split('/')[2];
    if (currentPage === '/services') return 'services';
    if (currentPage === '/portfolio') return 'portfolio';
    if (currentPage === '/about') return 'about';
    if (currentPage === '/contact') return 'contact';
    if (currentPage === '/blog') return 'blog';
    if (currentPage.startsWith('/blog/')) return `blog-${currentPage.split('/')[2]}`;
    return 'home';
  };

  const currentLogicalPage = getPageName();

  return (
    // Rendi lo sfondo del wrapper trasparente quando usiamo `hasBackground`
    <div className={`min-h-screen ${hasBackground ? '' : 'bg-white'}`}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#4f4f4f] z-50 border-b border-[#4f4f4f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/">
                <img 
                  src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png" 
                  alt="VentoADV Logo"
                  className="h-15 w-auto transition-transform duration-300 ease-in-out hover:scale-110"
                  style={{ height: '3.75rem' }} // 25% larger than h-12 (3rem)
                />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className={`text-white hover:text-[#d2ad40] transition-colors ${currentLogicalPage === 'home' ? 'text-[#d2ad40] font-semibold' : ''}`}>HOME</Link>
              <Link href="/about" className={`text-white hover:text-[#d2ad40] transition-colors ${currentLogicalPage === 'about' ? 'text-[#d2ad40] font-semibold' : ''}`}>CHI SIAMO</Link>
              <div 
                className="relative group"
                onMouseEnter={() => {
                  clearTimeout(window.dropdownTimeout);
                  setIsServicesDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  window.dropdownTimeout = setTimeout(() => setIsServicesDropdownOpen(false), 500);
                }}
              >
                <Link href="/services"
                  className={`flex items-center text-white hover:text-[#d2ad40] transition-colors ${currentLogicalPage === 'services' || services.some(s => s.id === currentLogicalPage) ? 'text-[#d2ad40] font-semibold' : ''}`}
                >
                  SERVIZI
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Link>
                {isServicesDropdownOpen && (
                  <div 
                    className="absolute left-0 mt-2 w-64 bg-[#4f4f4f] rounded-lg shadow-lg border border-[#d2ad40]"
                    onMouseEnter={() => {
                      clearTimeout(window.dropdownTimeout);
                      setIsServicesDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      window.dropdownTimeout = setTimeout(() => setIsServicesDropdownOpen(false), 500);
                    }}
                  >
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-[#d2ad40] hover:text-gray-900 transition-colors"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/portfolio" className={`text-white hover:text-[#d2ad40] transition-colors ${currentLogicalPage === 'portfolio' ? 'text-[#d2ad40] font-semibold' : ''}`}>LAVORI</Link>
              <Link href="/blog" className={`text-white hover:text-[#d2ad40] transition-colors ${currentLogicalPage === 'blog' ? 'text-[#d2ad40] font-semibold' : ''}`}>BLOG</Link>
            </nav>
            <Link href="/contact" className="hidden md:block bg-[#d2ad40] hover:bg-[#b89638] text-white px-8 py-3 rounded-full font-semibold transition-colors">
              CONTATTACI
            </Link>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#4f4f4f] border-t border-[#d2ad40]"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="/" className="block text-white">HOME</Link>
              <Link href="/about" className="block text-white">CHI SIAMO</Link>
              <div>
                <Link href="/services" className="flex items-center text-white w-full text-left"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/services');
                    setIsServicesDropdownOpen(!isServicesDropdownOpen);
                  }}
                >
                  SERVIZI <ChevronDown className="w-4 h-4 ml-1" />
                </Link>
                {isServicesDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {services.map((service) => (
                      <Link key={service.id} href={`/services/${service.id}`} className="block text-white pl-4" onClick={() => setIsMenuOpen(false)}>
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/portfolio" className="block text-white">LAVORI</Link>
              <Link href="/blog" className="block text-white">BLOG</Link>
              <Link href="/contact" className="block text-white">CONTATTACI</Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Background */}
      {hasBackground && (
        <div className="absolute inset-0 -z-10 opacity-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImage}')` }}></div>
        </div>
      )}

      {/* Main Content */}
      {/* Ridotto il padding top/bottom per avvicinare header e footer */}
      <main className={noPadding ? "" : hasBackground ? "pt-16" : "pt-20 pb-12"}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#4f4f4f] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/">
                <img 
                  src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png" 
                  alt="VentoADV Logo"
                  className="h-8 w-auto mb-4"
                />
              </Link>
              <p className="text-gray-300 max-w-md">
                La tua web agency di fiducia per soluzioni digitali innovative e performanti.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#d2ad40' }}>Servizi</h3>
              <ul className="space-y-2 text-gray-300">
                {services.map((service) => (
                  <li key={service.id} className="cursor-pointer hover:text-[#d2ad40] transition-colors">
                    <Link href={`/services/${service.id}`}>{service.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#d2ad40' }}>Contatti</h3>
              <ul className="space-y-2 text-gray-300">
                <li>info@webagency.it</li>
                <li>+39 02 1234567</li>
                <li>Milano, Italia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WebAgency. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}