import { getPageBySlug } from '@/lib/wp'
import HomeAltClient from './HomeAltClient'

export const metadata = {
	title: 'Home Alt | VentoADV',
	description: 'Web agency specializzata in soluzioni digitali innovative.',
}

export const dynamic = 'force-dynamic'

export default async function HomeAltPage() {
	// Fetch 'home-page' data
	let pageData = await getPageBySlug('home-page')

	if (!pageData) {
		pageData = await getPageBySlug('home')
	}

	// If still no data (e.g. API error), provide minimal fallback to prevent crash
	if (!pageData) {
		pageData = {
			customTitle: 'Trasformiamo Idee in Esperienze Digitali',
			subtitle: 'Web agency specializzata in soluzioni digitali innovative per aziende che vogliono distinguersi nel mondo online.',
			acf: {}
		}
	}

	return <HomeAltClient data={pageData} />
}
