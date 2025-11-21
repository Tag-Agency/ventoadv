'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { motion, LazyMotion, domAnimation } from 'framer-motion'

const services = [
	{
		id: 'marketing',
		title: 'Marketing',
		description:
			'Strategie di marketing su misura per raggiungere i tuoi obiettivi commerciali.',
	},
	{
		id: 'advertising-branding',
		title: 'Advertising & Branding',
		description:
			'Creazione di campagne pubblicitarie e identità di marca memorabili.',
	},
	{
		id: 'web-web-marketing',
		title: 'Web & Web Marketing',
		description:
			'Siti web ottimizzati con strategie di marketing digitale integrate.',
	},
	{
		id: 'social-media-marketing',
		title: 'Social Media Marketing',
		description:
			'Gestione e ottimizzazione dei canali social per aumentare il tuo engagement.',
	},
	{
		id: 'ecommerce',
		title: 'Ecommerce',
		description:
			'Piattaforme e-commerce complete con integrazione di pagamenti e logistica.',
	},
	{
		id: 'lead-marketing',
		title: 'Lead Marketing',
		description:
			'Strategie mirate per generare e convertire lead di qualità.',
	},
]

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const servicesRef = useRef(null)
	const closeTimeoutRef = useRef(null)
	const pathname = usePathname()
	const router = useRouter()

	const isHomePage = pathname === '/' || pathname === '/home-alt'

	const isActive = (href) => {
		if (href === '/') return pathname === '/'
		return pathname.startsWith(href)
	}

	const linkClasses = useCallback(
		(href) =>
			`${isActive(href)
				? 'text-primary font-semibold'
				: isHomePage
					? isScrolled
						? 'text-white hover:text-primary'
						: 'text-white hover:text-primary'
					: 'text-white hover:text-primary'
			} transition-colors`,
		[pathname, isHomePage, isScrolled]
	)

	const openDropdown = useCallback(() => {
		if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
		setIsServicesDropdownOpen(true)
	}, [])

	const scheduleCloseDropdown = useCallback((delay = 300) => {
		if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
		closeTimeoutRef.current = setTimeout(
			() => setIsServicesDropdownOpen(false),
			delay
		)
	}, [])

	const handleLinkClick = useCallback(
		(e, href) => {
			if (pathname !== href) {
				setIsLoading(true)
				// The loading will be stopped by the pathname useEffect
			}
		},
		[pathname]
	)

	// Close dropdown when clicking outside of the services area (desktop)
	useEffect(() => {
		const onDocMouseDown = (e) => {
			if (!servicesRef.current) return
			if (!servicesRef.current.contains(e.target)) {
				setIsServicesDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', onDocMouseDown)
		return () => document.removeEventListener('mousedown', onDocMouseDown)
	}, [])

	// Loading indicator on route changes
	useEffect(() => {
		const handleStart = () => setIsLoading(true)
		const handleComplete = () => setIsLoading(false)

		// Listen to pathname changes
		handleComplete() // Reset loading state when pathname changes

		return () => {
			handleComplete()
		}
	}, [pathname])

	// Handle scroll for sticky header background
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY
			setIsScrolled(scrollTop > 50) // Add background after 50px scroll
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<LazyMotion features={domAnimation}>
			<header
				className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${isHomePage
					? isScrolled
						? 'bg-black/80 backdrop-blur-xl shadow-lg'
						: 'bg-transparent'
					: 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg'
					}`}
			>
				{/* Loading bar */}
				{isLoading && (
					<motion.div
						className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-yellow-300"
						initial={{ width: '0%' }}
						animate={{ width: '100%' }}
						transition={{ duration: 0.8, ease: 'easeInOut' }}
						style={{ zIndex: 60 }}
					/>
				)}
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					{/* Mobile Bar: burger left, logo center, contact right */}
					<div className="md:hidden h-20 flex items-center justify-between">
						<button
							aria-label="Apri menù"
							className={`group relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors ${isHomePage ? (isScrolled ? 'text-white' : 'text-white') : 'text-gray-900'
								}`}
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<div className="relative w-6 h-5 flex flex-col justify-between">
								<span className={`w-full h-0.5 bg-current rounded-full transform transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-45 translate-x-px' : ''}`}></span>
								<span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
								<span className={`w-full h-0.5 bg-current rounded-full transform transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-45 translate-x-px' : ''}`}></span>
							</div>
						</button>

						<Link href="/" className="flex items-center group" prefetch={true}>
							<img
								src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png"
								alt="VentoADV Logo"
								className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
								loading="eager"
							/>
						</Link>

						<Link
							href="/contatti"
							prefetch={true}
							className="group relative px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
							aria-label="Contattaci"
						>
							<MessageCircle className="w-5 h-5" />
						</Link>
					</div>

					{/* Desktop Bar */}
					<div className="hidden md:flex justify-between items-center h-20">
						<div className="flex items-center">
							<Link href="/" className="inline-block group" prefetch={true}>
								<img
									src="https://www.ventoadv.it/wp-content/uploads/2020/05/VentoADV_LOGO-500-White.png"
									alt="VentoADV Logo"
									className="h-16 w-auto transition-transform duration-200 ease-out group-hover:scale-105"
									loading="eager"
								/>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex space-x-8">
							<Link
								href="/"
								className={linkClasses('/')}
								prefetch={true}
								onClick={(e) => handleLinkClick(e, '/')}
							>
								HOME
							</Link>
							<Link
								href="/chi-siamo"
								className={linkClasses('/chi-siamo')}
								prefetch={true}
								onClick={(e) => handleLinkClick(e, '/chi-siamo')}
							>
								CHI SIAMO
							</Link>
							<div
								className="relative flex items-center gap-1 group"
								ref={servicesRef}
								onMouseEnter={openDropdown}
								onMouseLeave={() => scheduleCloseDropdown()}
								onFocus={openDropdown}
								onBlur={(e) => {
									// Close only if focus moved outside the services area
									if (!servicesRef.current?.contains(e.relatedTarget)) {
										scheduleCloseDropdown()
									}
								}}
								aria-haspopup="true"
								aria-expanded={isServicesDropdownOpen}
							>
								<Link
									href="/servizi"
									className={`${linkClasses('/servizi').replace(
										'hover:text-primary',
										''
									)} group-hover:text-primary`}
									prefetch={true}
									onClick={(e) => handleLinkClick(e, '/servizi')}
								>
									SERVIZI
								</Link>
								<ChevronDown
									className={`w-4 h-4 transition-colors ${isHomePage ? 'text-white group-hover:text-primary' : 'text-gray-900 group-hover:text-primary'
										}`}
									aria-hidden="true"
								/>
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{
										opacity: isServicesDropdownOpen ? 1 : 0,
										y: isServicesDropdownOpen ? 0 : -10,
										display: isServicesDropdownOpen ? 'block' : 'none',
									}}
									transition={{ duration: 0.2 }}
									className={`absolute left-0 top-full mt-3 w-80 rounded-2xl shadow-2xl border z-50 overflow-hidden ${isHomePage
										? 'bg-black/90 backdrop-blur-xl border-white/20'
										: 'bg-white/95 backdrop-blur-md border-gray-200/50'
										}`}
									onMouseEnter={openDropdown}
									onMouseLeave={() => scheduleCloseDropdown()}
								>
									<div className="p-2">
										{services.map((service) => (
											<Link
												key={service.id}
												href={`/servizi/${service.id}`}
												className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isHomePage
													? 'text-white hover:text-primary hover:bg-white/10'
													: 'text-gray-900 hover:text-primary hover:bg-gray-50'
													}`}
												onClick={(e) => {
													setIsServicesDropdownOpen(false)
													handleLinkClick(e, `/servizi/${service.id}`)
												}}
												prefetch={true}
											>
												<div className="font-semibold">{service.title}</div>
												<div className={`text-sm mt-1 ${isHomePage ? 'text-white/70' : 'text-gray-600'
													}`}>
													{service.description}
												</div>
											</Link>
										))}
									</div>
								</motion.div>
							</div>
							<Link
								href="/portfolio"
								className={linkClasses('/portfolio')}
								prefetch={true}
								onClick={(e) => handleLinkClick(e, '/portfolio')}
							>
								LAVORI
							</Link>
							<Link
								href="/blog"
								className={linkClasses('/blog')}
								prefetch={false}
								onClick={(e) => handleLinkClick(e, '/blog')}
							>
								BLOG
							</Link>
						</nav>

						{/* Desktop Contact Button */}
						<Link
							href="/contatti"
							className="hidden md:block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
							onClick={(e) => handleLinkClick(e, '/contatti')}
							prefetch={true}
						>
							CONTATTACI
						</Link>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						className={`md:hidden border-t ${isHomePage
							? 'bg-black/80 backdrop-blur-xl border-white/10'
							: 'bg-white/95 backdrop-blur-md border-gray-200/50'
							}`}
					>
						<div className="px-6 py-6 space-y-1">
							<Link
								href="/"
								className={`block w-full text-left py-4 px-4 rounded-xl font-medium transition-all duration-200 ${isActive('/')
									? 'text-primary bg-primary/10'
									: isHomePage
										? 'text-white hover:text-primary hover:bg-white/10'
										: 'text-gray-900 hover:text-primary hover:bg-gray-50'
									}`}
								onClick={() => setIsMenuOpen(false)}
							>
								HOME
							</Link>
							<Link
								href="/chi-siamo"
								className={`block w-full text-left py-4 px-4 rounded-xl font-medium transition-all duration-200 ${isActive('/chi-siamo')
									? 'text-primary bg-primary/10'
									: isHomePage
										? 'text-white hover:text-primary hover:bg-white/10'
										: 'text-gray-900 hover:text-primary hover:bg-gray-50'
									}`}
								onClick={() => setIsMenuOpen(false)}
							>
								CHI SIAMO
							</Link>
							<Link
								href="/servizi"
								className={`block w-full text-left py-4 px-4 rounded-xl font-medium transition-all duration-200 ${isActive('/servizi')
									? 'text-primary bg-primary/10'
									: isHomePage
										? 'text-white hover:text-primary hover:bg-white/10'
										: 'text-gray-900 hover:text-primary hover:bg-gray-50'
									}`}
								onClick={() => setIsMenuOpen(false)}
							>
								SERVIZI
							</Link>
							<Link
								href="/portfolio"
								className={`block w-full text-left py-4 px-4 rounded-xl font-medium transition-all duration-200 ${isActive('/portfolio')
									? 'text-primary bg-primary/10'
									: isHomePage
										? 'text-white hover:text-primary hover:bg-white/10'
										: 'text-gray-900 hover:text-primary hover:bg-gray-50'
									}`}
								onClick={() => setIsMenuOpen(false)}
							>
								LAVORI
							</Link>
							<Link
								href="/blog"
								className={`block w-full text-left py-4 px-4 rounded-xl font-medium transition-all duration-200 ${isActive('/blog')
									? 'text-primary bg-primary/10'
									: isHomePage
										? 'text-white hover:text-primary hover:bg-white/10'
										: 'text-gray-900 hover:text-primary hover:bg-gray-50'
									}`}
								onClick={() => setIsMenuOpen(false)}
							>
								BLOG
							</Link>
							<Link
								href="/contatti"
								className={`block w-full text-left py-4 px-4 rounded-xl font-medium transition-all duration-200 ${isActive('/contatti')
									? 'text-primary bg-primary/10'
									: isHomePage
										? 'text-white hover:text-primary hover:bg-white/10'
										: 'text-gray-900 hover:text-primary hover:bg-gray-50'
									}`}
								onClick={() => setIsMenuOpen(false)}
							>
								CONTATTACI
							</Link>
						</div>
					</motion.div>
				)}
			</header>
		</LazyMotion>
	)
}