import { getPageBySlug } from '@/lib/wp'
import ParallaxHero from '@/components/ParallaxHero'
import ServicesCarousel from '@/components/ServicesCarousel'

export const revalidate = 60

export default async function ChiSiamo() {
  let page = null
  try {
    page = await getPageBySlug('chi-siamo')
  } catch (e) {
    console.error('Failed to fetch Chi Siamo page:', e)
  }

  if (!page) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Chi Siamo</h1>
          <p className="text-gray-600">Contenuto non disponibile. Verifica la connessione a WordPress.</p>
        </div>
      </div>
    )
  }

  // Use the image from WordPress if available, otherwise use the known hero image
  const heroImage = page.image || 'https://work.tagagency.it/ventoadv/wp-content/uploads/2016/07/Sfondo-Vento-ChiSiamo.jpg'

  return (
    <div className="bg-white">
      <ParallaxHero src={heroImage} alt={page.title} height={450}>
        <div className="text-center">
          {page.customTitle && (
            <h1
              className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-md mb-4"
              dangerouslySetInnerHTML={{ __html: page.customTitle }}
            />
          )}
          {page.subtitle && (
            <h2
              className="text-primary text-xl sm:text-2xl lg:text-3xl font-semibold drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: page.subtitle }}
            />
          )}
        </div>
      </ParallaxHero>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>

      <ServicesCarousel />
    </div>
  )
}