// lib/data.js

export const services = [
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

export const portfolioItems = [
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

export const blogPosts = [
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

export const teamMembers = [
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