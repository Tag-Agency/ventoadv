import { getPageBySlug } from '@/lib/wp'
import ParallaxHero from '@/components/ParallaxHero'
import ServicesGrid from '@/components/ServicesGrid'

export const revalidate = 60

export default async function Servizi() {
  let page = null
  try {
    page = await getPageBySlug('servizi')
  } catch (e) {
    console.error('Failed to fetch Servizi page:', e)
  }

  // Use the image from WordPress if available
  const heroImage = page?.image
  const heroAlt = page?.imageAlt || page?.title || 'I Nostri Servizi'

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

      <ServicesGrid />
    </div>
  )
}
