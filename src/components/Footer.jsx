import { getFooterData } from '@/lib/wp'
import FooterClient from './FooterClient'

export default async function Footer() {
  try {
    const footerData = await getFooterData()
    console.log('Footer: Data structure:', JSON.stringify(footerData, null, 2))
    
    const ctaData = footerData?.ctaData || {
      backgroundImage: '',
      title: 'FALLBACK - Errore CTA',
      buttonText: 'Contattaci Ora',
      buttonLink: '/contatti'
    }
    
    const contactData = footerData?.contactData || {
      email: '',
      phone: '',
      address: ''
    }
    
    return <FooterClient ctaData={ctaData} contactData={contactData} />
  } catch (error) {
    console.error('Footer: Error fetching data:', error)
    // Fallback with empty data
    return <FooterClient ctaData={{
      backgroundImage: '',
      title: 'FALLBACK - Catch Error',
      buttonText: 'Contattaci Ora',
      buttonLink: '/contatti'
    }} contactData={{
      email: '',
      phone: '',
      address: ''
    }} />
  }
}