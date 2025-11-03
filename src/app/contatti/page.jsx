import { getPageBySlug } from '@/lib/wp'
import ParallaxHero from '@/components/ParallaxHero'
import ContactForm from '@/components/ContactForm'

export const revalidate = 60

export default async function Contatti() {
  let page = null
  try {
    page = await getPageBySlug('contatti')
  } catch (e) {
    console.error('Failed to fetch Contatti page:', e)
  }

  if (!page) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contatti</h1>
          <p className="text-gray-600">Contenuto non disponibile. Verifica la connessione a WordPress.</p>
        </div>
      </div>
    )
  }

  const heroImage = page.image
  const heroAlt = page?.imageAlt || page?.title || 'Contattaci'

  return (
    <div className="bg-white">
  <ParallaxHero src={heroImage} alt={heroAlt} height={450}>
        <div className="text-center">
          {page?.customTitle && (
            <h1
              className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-md mb-4"
              dangerouslySetInnerHTML={{ __html: page.customTitle }}
            />
          )}
          {page?.subtitle && (
            <h2
              className="text-primary text-xl sm:text-2xl lg:text-3xl font-semibold drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: page.subtitle }}
            />
          )}
        </div>
      </ParallaxHero>

      <ContactForm hasHero={true} />
    </div>
  )
}