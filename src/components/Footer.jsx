export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img 
              src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png" 
              alt="VentoADV Logo"
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-300 max-w-md">
              La tua web agency di fiducia per soluzioni digitali innovative e performanti.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Servizi</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="cursor-pointer hover:text-primary transition-colors">
                Marketing
              </li>
              <li className="cursor-pointer hover:text-primary transition-colors">
                Web & Web Marketing
              </li>
              <li className="cursor-pointer hover:text-primary transition-colors">
                Ecommerce
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contatti</h3>
            <ul className="space-y-2 text-gray-300">
              <li>info@webagency.it</li>
              <li>+39 02 1234567</li>
              <li>Milano, Italia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} WebAgency. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}