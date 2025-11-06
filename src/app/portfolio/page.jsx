import ParallaxHero from '@/components/ParallaxHero'
import PortfolioClient from '@/components/PortfolioClient'
import { getPageBySlug } from '@/lib/wp'

export const revalidate = 30

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Fashion",
    category: "Web Design",
    description: "Piattaforma e-commerce completa per brand di moda italiana",
    image: "https://placehold.co/400x300.png?text=Fashion+E-commerce&bg=d2ad40&fg=ffffff"
  },
  {
    id: 2,
    title: "Corporate Website",
    category: "Sviluppo Web",
    description: "Sito istituzionale per azienda leader nel settore industriale",
    image: "https://placehold.co/400x300.png?text=Corporate+Site&bg=4f4f4f&fg=ffffff"
  },
  {
    id: 3,
    title: "Brand Identity",
    category: "Branding",
    description: "Rinnovamento completo dell'identità visiva per startup tech",
    image: "https://placehold.co/400x300.png?text=Brand+Identity&bg=d2ad40&fg=ffffff"
  },
  {
    id: 4,
    title: "Mobile App",
    category: "Sviluppo Web",
    description: "Applicazione mobile per servizio di delivery food",
    image: "https://placehold.co/400x300.png?text=Mobile+App&bg=4f4f4f&fg=ffffff"
  }
]

export default async function Portfolio() {
  let page = null
  try {
    page = await getPageBySlug('portfolio')
  } catch (e) {
    console.error('Failed to fetch Portfolio page:', e)
  }

  const heroImage = page?.image
  const heroAlt = page?.imageAlt || page?.title || 'Portfolio'

  return (
    <div className="bg-white">
      <ParallaxHero src={heroImage} alt={heroAlt} height={450}>
        <div className="text-center max-w-[95%] sm:max-w-[80%] lg:max-w-[60%] mx-auto">
          {page?.customTitle ? (
            <h1
              className="text-white text-4xl sm:text-5xl lg:text-5xl font-bold drop-shadow-md mb-4"
              dangerouslySetInnerHTML={{ __html: page.customTitle }}
            />
          ) : (
            <h1 className="text-white text-4xl sm:text-5xl lg:text-5xl font-bold drop-shadow-md mb-4">
              Portfolio
            </h1>
          )}
          {page?.subtitle && (
            <h2
              className="text-primary text-xl sm:text-2xl lg:text-3xl font-semibold drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: page.subtitle }}
            />
          )}
        </div>
      </ParallaxHero>

      <PortfolioClient items={portfolioItems} />
    </div>
  )
}