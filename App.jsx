```jsx
import React, { useState } from 'react';
import { Play, ChevronRight, Globe, Code, Palette, Rocket, Users, Award, Star, Menu, X, Phone, Mail, MapPin, ArrowLeft, ChevronDown, Home, Search, Calendar, Tag, Clock, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for portfolio items
  const portfolioItems = [
    {
      id: 1,
      title: "E-commerce Fashion",
      category: "Web Design",
      description: "Piattaforma e-commerce completa per brand di moda italiana",
      image: "https://placehold.co/400x300/d2ad40/ffffff?text=Fashion+E-commerce"
    },
    {
      id: 2,
      title: "Corporate Website",
      category: "Sviluppo Web",
      description: "Sito istituzionale per azienda leader nel settore industriale",
      image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Corporate+Site"
    },
    {
      id: 3,
      title: "Brand Identity",
      category: "Branding",
      description: "Rinnovamento completo dell'identità visiva per startup tech",
      image: "https://placehold.co/400x300/d2ad40/ffffff?text=Brand+Identity"
    },
    {
      id: 4,
      title: "Mobile App",
      category: "Sviluppo Web",
      description: "Applicazione mobile per servizio di delivery food",
      image: "https://placehold.co/400x300/4f4f4f/ffffff?text=Mobile+App"
    }
  ];

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
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Come migliorare il SEO del tuo sito web nel 2024",
      excerpt: "Scopri le ultime tendenze e best practice per ottimizzare il tuo sito web e posizionarti meglio sui motori di ricerca.",
      date: "2024-01-15",
      category: "SEO",
      author: "Marco Bianchi",
      image: "https://placehold.co/600x400/d2ad40/ffffff?text=SEO+Article",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Le migliori strategie di marketing digitale per il 2024",
      excerpt: "Analisi delle strategie più efficaci per il marketing digitale nell'anno in corso, con case study e risultati reali.",
      date: "2024-02-10",
      category: "Marketing",
      author: "Giulia Rossi",
      image: "https://placehold.co/600x400/4f4f4f/ffffff?text=Marketing+Article",
      readTime: "8 min"
    },
    {
      id: 3,
      title: "Design responsivo: perché è fondamentale nel 2024",
      excerpt: "Tutto ciò che devi sapere sul design responsivo e come implementarlo per offrire un'esperienza utente ottimale su tutti i dispositivi.",
      date: "2024-03-05",
      category: "Web Design",
      author: "Alessandro Verdi",
      image: "https://placehold.co/600x400/d2ad40/ffffff?text=Design+Article",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Come scegliere la migliore piattaforma e-commerce per il tuo business",
      excerpt: "Guida completa per aiutarti a scegliere la piattaforma e-commerce perfetta per le tue esigenze specifiche e il tuo budget.",
      date: "2024-03-20",
      category: "Ecommerce",
      author: "Sofia Neri",
      image: "https://placehold.co/600x400/4f4f4f/ffffff?text=Ecommerce+Article",
      readTime: "7 min"
    },
    {
      id: 5,
      title: "L'importanza del branding nella costruzione di un'identità di successo",
      excerpt: "Scopri perché il branding è cruciale per il successo della tua azienda e come costruire un'identità di marca memorabile.",
      date: "2024-04-02",
      category: "Branding",
      author: "Marco Bianchi",
      image: "https://placehold.co/600x400/d2ad40/ffffff?text=Branding+Article",
      readTime: "9 min"
    },
    {
      id: 6,
      title: "Come aumentare le conversioni del tuo sito web",
      excerpt: "Tecniche pratiche e strategie comprovate per aumentare le conversioni del tuo sito web e trasformare i visitatori in clienti.",
      date: "2024-04-15",
      category: "Marketing",
      author: "Giulia Rossi",
      image: "https://placehold.co/600x400/4f4f4f/ffffff?text=Conversion+Article",
      readTime: "6 min"
    }
  ];

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
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;
      case 'portfolio-detail':
        return <PortfolioDetailPage />;
      default:
        // Check if currentPage is a service page
        const servicePage = services.find(service => service.id === currentPage);
        if (servicePage) {
          return <ServiceDetailPage service={servicePage} />;
        }
        // Check if currentPage is a blog post
        const blogPost = blogPosts.find(post => `blog-${post.id}` === currentPage);
        if (blogPost) {
          return <BlogPostPage post={blogPost} />;
        }
        return <HomePage />;
    }
  };

  const HomePage = () => (
    <>
      {/* Hero Section with Video */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
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

        {/* Hero Content */}
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
              Web agency specializzata in soluzioni digitali innovative per aziende che vogliono 
              distinguersi nel mondo online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-[#d2ad40] hover:bg-[#b89638] text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage('contact')}
              >
                <Play className="w-5 h-5" />
                Inizia Progetto
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage('portfolio')}
              >
                Scopri Portfolio
                <ChevronRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-[#4f4f4f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              I Nostri Servizi
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Offriamo soluzioni complete per la tua presenza digitale, dalla strategia alla realizzazione.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => setCurrentPage(service.id)}
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Portfolio Selezionato
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri alcuni dei nostri progetti più recenti e di successo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.slice(0, 2).map((item) => (
              <motion.div
                key={item.id}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setCurrentPage('portfolio-detail')}
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
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const ServicesPage = () => (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">I Nostri Servizi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Offriamo soluzioni complete per la tua presenza digitale, dalla strategia alla realizzazione.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => setCurrentPage(service.id)}
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const ServiceDetailPage = ({ service }) => (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          className="flex items-center text-[#d2ad40] font-semibold mb-8"
          onClick={() => setCurrentPage('services')}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Torna ai Servizi
        </motion.button>

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
  );

  const PortfolioPage = () => (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scopri i nostri progetti più recenti e di successo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => setCurrentPage('portfolio-detail')}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-white">
                <span className="text-[#d2ad40] font-semibold">{item.category}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="py-20 bg-white">
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
              <Users className="w-8 h-8 text-[#d2ad40]" />
              <span className="text-gray-700 font-semibold">Team di esperti dedicati</span>
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
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-[#d2ad40] font-semibold">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="py-20 bg-[#4f4f4f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Contattaci</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pronto a iniziare il tuo prossimo progetto? Contattaci oggi stesso per una consulenza gratuita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#d2ad40] mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Telefono</h3>
                  <p className="text-gray-300">+39 02 1234567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#d2ad40] mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Email</h3>
                  <p className="text-gray-300">info@webagency.it</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#d2ad40] mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Indirizzo</h3>
                  <p className="text-gray-300">Via Roma 123, Milano, Italia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Nome" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2ad40]"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2ad40]"
                />
              </div>
              <input 
                type="text" 
                placeholder="Oggetto" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2ad40]"
              />
              <textarea 
                rows="6" 
                placeholder="Messaggio" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2ad40]"
              ></textarea>
              <motion.button
                className="w-full bg-[#d2ad40] hover:bg-[#b89638] text-white py-4 rounded-lg text-lg font-semibold transition-colors"
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
  );

  const BlogPage = () => {
    const filteredPosts = blogPosts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

    return (
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri le ultime notizie, trend e consigli sul mondo del web, marketing digitale e design.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Cerca articoli..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2ad40]"
                  />
                </div>
              </div>
              <div className="flex-1">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d2ad40]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Tutte le categorie' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => setCurrentPage(`blog-${post.id}`)}
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
                    <ArrowRight className="w-5 h-5 text-[#d2ad40]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Nessun articolo trovato con i criteri selezionati.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const BlogPostPage = ({ post }) => (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          className="flex items-center text-[#d2ad40] font-semibold mb-8"
          onClick={() => setCurrentPage('blog')}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Torna al Blog
        </motion.button>

        <div className="mb-8">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-6"
          />
          <div className="flex items-center space-x-4 mb-4">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-6">Di {post.author}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="mb-6">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Perché questo argomento è importante</h2>
          <p className="mb-6">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Consigli pratici</h2>
          <p className="mb-6">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Primo consiglio pratico per applicare quanto descritto nell'articolo</li>
            <li>Secondo consiglio pratico con esempi concreti</li>
            <li>Terzo consiglio per ottenere risultati ottimali</li>
            <li>Quarto consiglio per evitare gli errori più comuni</li>
          </ul>
          <p className="mb-6">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Articoli correlati</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).filter(p => p.id !== post.id).map((relatedPost) => (
              <div 
                key={relatedPost.id}
                className="bg-gray-50 p-6 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setCurrentPage(`blog-${relatedPost.id}`)}
              >
                <img 
                  src={relatedPost.image} 
                  alt={relatedPost.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{relatedPost.title}</h4>
                <div className="flex items-center space-x-4 text-gray-500">
                  <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                  <span>{relatedPost.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PortfolioDetailPage = () => (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          className="flex items-center text-[#d2ad40] font-semibold mb-8"
          onClick={() => setCurrentPage('portfolio')}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Torna al Portfolio
        </motion.button>

        <div className="mb-8">
          <span className="text-[#d2ad40] font-semibold">Web Design</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">E-commerce Fashion</h1>
          <p className="text-lg text-gray-600">
            Piattaforma e-commerce completa per brand di moda italiana con integrazione di pagamenti, 
            gestione inventario e sistema di raccomandazioni personalizzate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <img 
            src="https://placehold.co/600x400/d2ad40/ffffff?text=Project+Screenshot+1" 
            alt="Project Screenshot"
            className="rounded-xl shadow-lg"
          />
          <img 
            src="https://placehold.co/600x400/4f4f4f/ffffff?text=Project+Screenshot+2" 
            alt="Project Screenshot"
            className="rounded-xl shadow-lg"
          />
        </div>

        <div className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dettagli Progetto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Tecnologie Utilizzate</h3>
              <p className="text-gray-600">Next.js, WordPress Headless, Stripe API, Redis Cache</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Timeline</h3>
              <p className="text-gray-600">3 mesi di sviluppo + 1 mese di testing</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Risultati</h3>
              <p className="text-gray-600">+150% conversioni, -40% bounce rate, +200% tempo medio sul sito</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Cliente</h3>
              <p className="text-gray-600">Fashion Brand Italia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#4f4f4f] z-50 border-b border-[#4f4f4f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button onClick={() => setCurrentPage('home')}>
                <img 
                  src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png" 
                  alt="VentoADV Logo"
                  className="h-12 w-auto"
                />
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`text-white hover:text-[#d2ad40] transition-colors ${currentPage === 'home' ? 'text-[#d2ad40] font-semibold' : ''}`}
              >
                HOME
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className={`text-white hover:text-[#d2ad40] transition-colors ${currentPage === 'about' ? 'text-[#d2ad40] font-semibold' : ''}`}
              >
                CHI SIAMO
              </button>
              <div className="relative">
                <button 
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`flex items-center text-white hover:text-[#d2ad40] transition-colors ${currentPage === 'services' || services.some(s => s.id === currentPage) ? 'text-[#d2ad40] font-semibold' : ''}`}
                >
                  SERVIZI
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isServicesDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-[#4f4f4f] rounded-lg shadow-lg border border-[#d2ad40]">
                    {services.map((service, index) => (
                      <button
                        key={service.id}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-[#d2ad40] hover:text-gray-900 transition-colors"
                        onClick={() => {
                          setCurrentPage(service.id);
                          setIsServicesDropdownOpen(false);
                        }}
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setCurrentPage('portfolio')}
                className={`text-white hover:text-[#d2ad40] transition-colors ${currentPage === 'portfolio' ? 'text-[#d2ad40] font-semibold' : ''}`}
              >
                LAVORI
              </button>
              <button 
                onClick={() => setCurrentPage('blog')}
                className={`text-white hover:text-[#d2ad40] transition-colors ${currentPage === 'blog' ? 'text-[#d2ad40] font-semibold' : ''}`}
              >
                BLOG
              </button>
            </nav>

            {/* Contact Button */}
            <button 
              onClick={() => setCurrentPage('contact')}
              className="hidden md:block bg-[#d2ad40] hover:bg-[#b89638] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              CONTATTACI
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#4f4f4f] border-t border-[#d2ad40]"
          >
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                className={`block w-full text-left ${currentPage === 'home' ? 'text-[#d2ad40] font-semibold' : 'text-white'}`}
              >
                HOME
              </button>
              <button 
                onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }}
                className={`block w-full text-left ${currentPage === 'about' ? 'text-[#d2ad40] font-semibold' : 'text-white'}`}
              >
                CHI SIAMO
              </button>
              <div className="relative">
                <button 
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`flex items-center w-full text-left ${currentPage === 'services' || services.some(s => s.id === currentPage) ? 'text-[#d2ad40] font-semibold' : 'text-white'}`}
                >
                  SERVIZI
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isServicesDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {services.map((service, index) => (
                      <button
                        key={service.id}
                        className="block w-full text-left pl-4 text-white hover:text-[#d2ad40] transition-colors"
                        onClick={() => {
                          setCurrentPage(service.id);
                          setIsServicesDropdownOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        {service.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => { setCurrentPage('portfolio'); setIsMenuOpen(false); }}
                className={`block w-full text-left ${currentPage === 'portfolio' ? 'text-[#d2ad40] font-semibold' : 'text-white'}`}
              >
                LAVORI
              </button>
              <button 
                onClick={() => { setCurrentPage('blog'); setIsMenuOpen(false); }}
                className={`block w-full text-left ${currentPage === 'blog' ? 'text-[#d2ad40] font-semibold' : 'text-white'}`}
              >
                BLOG
              </button>
              <button 
                onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }}
                className={`block w-full text-left ${currentPage === 'contact' ? 'text-[#d2ad40] font-semibold' : 'text-white'}`}
              >
                CONTATTACI
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Page Background Images */}
      <div className={`absolute inset-0 -z-10 ${currentPage === 'home' ? 'opacity-0' : 'opacity-100'}`}>
        {currentPage === 'services' && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Lavori-Vento.jpg')` }}></div>
        )}
        {currentPage === 'portfolio' && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Lavori-Vento.jpg')` }}></div>
        )}
        {currentPage === 'about' && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Vento-ChiSiamo.jpg')` }}></div>
        )}
        {currentPage === 'contact' && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Contatti-Vento.jpg')` }}></div>
        )}
        {currentPage === 'portfolio-detail' && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://www.ventoadv.it/wp-content/uploads/2020/06/Vento_Contatti-Form.jpg')` }}></div>
        )}
        {currentPage === 'blog' && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Lavori-Vento.jpg')` }}></div>
        )}
        {currentPage.startsWith('blog-') && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Lavori-Vento.jpg')` }}></div>
        )}
        {/* Service pages background */}
        {services.some(s => s.id === currentPage) && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://www.ventoadv.it/wp-content/uploads/2016/07/Sfondo-Lavori-Vento.jpg')` }}></div>
        )}
      </div>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-[#4f4f4f] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <button onClick={() => setCurrentPage('home')}>
                <img 
                  src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png" 
                  alt="VentoADV Logo"
                  className="h-8 w-auto mb-4"
                />
              </button>
              <p className="text-gray-300 max-w-md">
                La tua web agency di fiducia per soluzioni digitali innovative e performanti.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#d2ad40' }}>Servizi</h3>
              <ul className="space-y-2 text-gray-300">
                {services.map((service, index) => (
                  <li key={index} className="cursor-pointer hover:text-[#d2ad40] transition-colors" onClick={() => setCurrentPage(service.id)}>
                    {service.title}
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
};

export default App;
```