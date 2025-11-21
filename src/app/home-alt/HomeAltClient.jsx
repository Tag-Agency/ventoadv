'use client'

import { Play, ChevronRight, TrendingUp, Megaphone, Globe, Share2, ShoppingCart, Target } from 'lucide-react'
import { motion, LazyMotion, domAnimation, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

const services = [
	{
		id: 'marketing',
		title: 'Marketing',
		description: 'Strategie di marketing su misura.',
		icon: TrendingUp,
	},
	{
		id: 'advertising-branding',
		title: 'Advertising & Branding',
		description: 'Campagne pubblicitarie e identità di marca.',
		icon: Megaphone,
	},
	{
		id: 'web-web-marketing',
		title: 'Web & Web Marketing',
		description: 'Siti web ottimizzati con marketing digitale.',
		icon: Globe,
	},
	{
		id: 'social-media-marketing',
		title: 'Social Media Marketing',
		description: 'Gestione canali social per engagement.',
		icon: Share2,
	},
	{
		id: 'ecommerce',
		title: 'Ecommerce',
		description: 'Piattaforme e-commerce complete.',
		icon: ShoppingCart,
	},
	{
		id: 'lead-marketing',
		title: 'Lead Marketing',
		description: 'Generazione e conversione lead.',
		icon: Target,
	},
]

export default function HomeAlt({ data }) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [time, setTime] = useState(0)
	const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 })
	const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 })
	const [particleOrigins, setParticleOrigins] = useState(
		Array.from({ length: 16 }, () => ({
			x: Math.random() * 100,
			y: Math.random() * 100,
			vx: (Math.random() - 0.5) * 1.5,
			vy: (Math.random() - 0.5) * 1.5,
			size: Math.random() * 8 + 6 // Size between 6px and 14px
		}))
	)
	const heroRef = useRef(null)

	// Destructure data for hero text
	const heroTitle = data?.acf?.hero_titolo || 'Trasformiamo Idee in'
	const heroHighlight = data?.acf?.hero_sottotitolo || 'Esperienze Digitali'
	const subtitle = data?.acf?.hero_descrizione || 'Web agency specializzata in soluzioni digitali innovative per aziende che vogliono distinguersi nel mondo online.'

	const ctaPrimary = data?.acf?.call_to_action || 'Contattaci'
	const ctaPrimaryLink = data?.acf?.bottone_cta || '/contatti'

	// Secondary button might not be in ACF yet, keeping default or checking if exists
	const ctaSecondary = data?.acf?.bottone_secondario_testo || 'Portfolio'
	const ctaSecondaryLink = data?.acf?.bottone_secondario_link || '/portfolio'

	// Smoothed mouse position for latency effect
	const smoothedMouseX = useSpring(mousePosition.x, { stiffness: 100, damping: 20 })
	const smoothedMouseY = useSpring(mousePosition.y, { stiffness: 100, damping: 20 })

	// Update particle origins periodically for ambient effect
	useEffect(() => {
		let animationId

		const updateParticles = () => {
			setTime(Date.now() / 1000)
			setParticleOrigins(prev =>
				prev.map(particle => ({
					...particle,
					x: particle.x + particle.vx * 0.016, // 60fps equivalent
					y: particle.y + particle.vy * 0.016,
					vx: particle.vx * 0.995 + (Math.random() - 0.5) * 0.02, // Damping + small randomness
					vy: particle.vy * 0.995 + (Math.random() - 0.5) * 0.02
				})).map(particle => ({
					...particle,
					// Keep particles within bounds with soft bounce
					x: Math.max(2, Math.min(98, particle.x)),
					y: Math.max(2, Math.min(98, particle.y)),
					// Soft bounce off edges
					vx: particle.x <= 2 || particle.x >= 98 ? -particle.vx * 0.8 : particle.vx,
					vy: particle.y <= 2 || particle.y >= 98 ? -particle.vy * 0.8 : particle.vy
				}))
			)
			animationId = requestAnimationFrame(updateParticles)
		}

		animationId = requestAnimationFrame(updateParticles)

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId)
			}
		}
	}, [])

	// Liquid effect options
	const liquidEffects = {
		// Option A: Interactive blobs following mouse
		blobs: () => (
			<>
				{Array.from({ length: 3 }, (_, i) => (
					<motion.div
						key={i}
						className="absolute rounded-full pointer-events-none"
						style={{
							background: `radial-gradient(circle, rgba(210,173,64,${0.3 - i * 0.1}) 0%, transparent 70%)`,
							width: '200px',
							height: '200px',
							left: `${mousePosition.x}%`,
							top: `${mousePosition.y}%`,
							transform: 'translate(-50%, -50%)'
						}}
						animate={{
							scale: [1, 1.5, 1],
							opacity: [0.6, 0.3, 0.6]
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							delay: i * 0.8,
							ease: "easeInOut"
						}}
					/>
				))}
			</>
		),

		// Option B: Large concentric waves with latency (current favorite)
		waves: () => {
			// Calculate deformation based on mouse position relative to center
			const centerX = 50;
			const centerY = 50;
			const distanceFromCenter = Math.sqrt(
				Math.pow(mousePosition.x - centerX, 2) +
				Math.pow(mousePosition.y - centerY, 2)
			);

			// Calculate deformation factors - INCREASED INFLUENCE
			const maxDeformation = 0.6; // Increased from 0.3 to 0.6
			const deformationX = 1 + (maxDeformation * (mousePosition.x - centerX) / 50);
			const deformationY = 1 + (maxDeformation * (mousePosition.y - centerY) / 50);
			const skewAmount = (mousePosition.x - centerX) * 0.025; // Increased from 0.01 to 0.025

			// Add velocity-based intensity multiplier
			const velocityMagnitude = Math.sqrt(mouseVelocity.x ** 2 + mouseVelocity.y ** 2);
			const velocityMultiplier = 1 + Math.min(velocityMagnitude * 0.1, 0.5); // Max 50% boost

			return (
				<>
					{Array.from({ length: 4 }, (_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full border-2 pointer-events-none"
							style={{
								borderColor: `rgba(210,173,64,${0.25 - i * 0.05})`,
								width: '100px',
								height: '100px',
								left: smoothedMouseX,
								top: smoothedMouseY,
								transform: `translate(-50%, -50%) scale(${deformationX * velocityMultiplier}, ${deformationY * velocityMultiplier}) skew(${skewAmount * velocityMultiplier}deg, 0deg)`,
								transformOrigin: 'center center'
							}}
							animate={{
								scale: [0, 12, 0],
								opacity: [0.8, 0.2, 0.8]
							}}
							transition={{
								duration: 10, // Rallentato da 6 secondi
								repeat: Infinity,
								delay: i * 1.2,
								ease: "easeOut"
							}}
						/>
					))}
					{Array.from({ length: 3 }, (_, i) => (
						<motion.div
							key={`wave2-${i}`}
							className="absolute rounded-full border pointer-events-none"
							style={{
								borderColor: `rgba(210,173,64,${0.15 - i * 0.03})`,
								borderWidth: '1px',
								width: '80px',
								height: '80px',
								left: smoothedMouseX,
								top: smoothedMouseY,
								transform: `translate(-50%, -50%) scale(${deformationX * velocityMultiplier * 0.8}, ${deformationY * velocityMultiplier * 0.8}) skew(${skewAmount * velocityMultiplier * 0.8}deg, 0deg)`,
								transformOrigin: 'center center'
							}}
							animate={{
								scale: [0, 15, 0],
								opacity: [0.6, 0.1, 0.6]
							}}
							transition={{
								duration: 12, // Rallentato da 8 secondi
								repeat: Infinity,
								delay: i * 1.8 + 0.5,
								ease: "easeOut"
							}}
						/>
					))}
				</>
			)
		},

		// Option C: Pulsing rings
		rings: () => (
			<>
				{Array.from({ length: 5 }, (_, i) => (
					<motion.div
						key={i}
						className="absolute rounded-full border pointer-events-none"
						style={{
							borderColor: `rgba(210,173,64,${0.4 - i * 0.08})`,
							borderWidth: '3px',
							width: '50px',
							height: '50px',
							left: `${mousePosition.x}%`,
							top: `${mousePosition.y}%`,
							transform: 'translate(-50%, -50%)'
						}}
						animate={{
							scale: [0, 8, 0],
							opacity: [1, 0.1, 1]
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: i * 0.6,
							ease: "easeOut"
						}}
					/>
				))}
			</>
		),

		// Option D: Flowing particles
		particles: () => {
			// Calculate connections between nearby particles
			const connections = []
			for (let i = 0; i < particleOrigins.length; i++) {
				for (let j = i + 1; j < particleOrigins.length; j++) {
					const dx = particleOrigins[i].x - particleOrigins[j].x
					const dy = particleOrigins[i].y - particleOrigins[j].y
					const distance = Math.sqrt(dx * dx + dy * dy)

					if (distance < 25) { // Connect particles within 25% distance
						connections.push({
							x1: particleOrigins[i].x,
							y1: particleOrigins[i].y,
							x2: particleOrigins[j].x,
							y2: particleOrigins[j].y,
							opacity: (25 - distance) / 25 // Fade based on distance
						})
					}
				}
			}

			return (
				<>
					{/* Connection lines */}
					<svg className="absolute inset-0 w-full h-full pointer-events-none">
						{connections.map((conn, index) => (
							<motion.line
								key={`connection-${index}`}
								x1={`${conn.x1}%`}
								y1={`${conn.y1}%`}
								x2={`${conn.x2}%`}
								y2={`${conn.y2}%`}
								stroke="rgba(210,173,64,0.3)"
								strokeWidth="1"
								initial={{ opacity: 0 }}
								animate={{ opacity: conn.opacity }}
								transition={{ duration: 0.5, ease: "easeOut" }}
							/>
						))}
					</svg>

					{/* Particles */}
					{Array.from({ length: 16 }, (_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full pointer-events-none"
							style={{
								background: `rgba(210,173,64,${0.8 - i * 0.04})`,
								width: `${particleOrigins[i]?.size || 10}px`,
								height: `${particleOrigins[i]?.size || 10}px`,
								left: `${particleOrigins[i]?.x || 50}%`,
								top: `${particleOrigins[i]?.y || 50}%`,
								transform: 'translate(-50%, -50%)'
							}}
							animate={{
								scale: [1, 1.3, 1],
								opacity: [0.6, 1, 0.6]
							}}
							transition={{
								duration: 2 + Math.random(), // Variable duration
								repeat: Infinity,
								delay: i * 0.1,
								ease: "easeInOut"
							}}
						/>
					))}
				</>
			)
		},

		// Option E: Liquid droplets
		droplets: () => (
			<>
				{Array.from({ length: 6 }, (_, i) => (
					<motion.div
						key={i}
						className="absolute rounded-full pointer-events-none"
						style={{
							background: `linear-gradient(135deg, rgba(210,173,64,${0.8 - i * 0.1}) 0%, rgba(210,173,64,${0.4 - i * 0.05}) 100%)`,
							width: '30px',
							height: '45px',
							borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
							left: `${mousePosition.x}%`,
							top: `${mousePosition.y}%`,
							transform: 'translate(-50%, -50%)'
						}}
						animate={{
							scale: [0, 1.5, 0],
							y: [0, -50, 0],
							opacity: [0, 0.9, 0]
						}}
						transition={{
							duration: 5,
							repeat: Infinity,
							delay: i * 0.8,
							ease: "easeOut"
						}}
					/>
				))}
			</>
		)
		,

		// Option F: Magnetic Grid
		magneticGrid: () => {
			const rows = 30; // Increased density (30x30 = 900 particles)
			const cols = 30;
			const items = [];

			for (let i = 0; i < rows; i++) {
				for (let j = 0; j < cols; j++) {
					const x = (j / (cols - 1)) * 100;
					const y = (i / (rows - 1)) * 100;

					const dx = mousePosition.x - x;
					const dy = mousePosition.y - y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					const maxDist = 30;

					// Ambient movement (wave effect)
					const ambientX = Math.sin(time * 2 + i * 0.2 + j * 0.2) * 0.5;
					const ambientY = Math.cos(time * 1.5 + i * 0.3 + j * 0.3) * 0.5;

					let tx = ambientX;
					let ty = ambientY;
					let scale = 1;
					let opacity = 0.15;
					let color = "rgba(255,255,255,0.15)";

					if (dist < maxDist) {
						const force = (maxDist - dist) / maxDist;
						const powerForce = Math.pow(force, 1.5);

						tx += dx * powerForce * 5; // Combine ambient + mouse
						ty += dy * powerForce * 5;
						scale = 1 + powerForce * 3;
						opacity = 0.2 + powerForce * 0.8;
						color = `rgba(210,173,64,${opacity})`;
					}

					items.push(
						<motion.div
							key={`${i}-${j}`}
							className="absolute rounded-full"
							style={{
								left: `${x}%`,
								top: `${y}%`,
								width: '1.5px', // Smaller particles
								height: '1.5px',
								backgroundColor: color,
								transform: 'translate(-50%, -50%)',
							}}
							animate={{
								x: tx * 8,
								y: ty * 8,
								scale: scale,
								backgroundColor: color
							}}
							transition={{ type: 'spring', stiffness: 150, damping: 15 }}
						/>
					)
				}
			}
			// Liquid Background Blobs
			const backgroundBlobs = (
				<>
					<motion.div
						className="absolute rounded-full blur-3xl opacity-20"
						style={{
							background: 'radial-gradient(circle, rgba(210,173,64,0.8) 0%, transparent 70%)',
							width: '60vw',
							height: '60vw',
							left: '20%',
							top: '20%',
							zIndex: 0,
							transform: 'translate(-50%, -50%)'
						}}
						animate={{
							x: [0, 100, -50, 0],
							y: [0, -50, 100, 0],
							scale: [1, 1.2, 0.9, 1],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							ease: "easeInOut"
						}}
					/>
					<motion.div
						className="absolute rounded-full blur-3xl opacity-15"
						style={{
							background: 'radial-gradient(circle, rgba(210,173,64,0.6) 0%, transparent 70%)',
							width: '50vw',
							height: '50vw',
							right: '10%',
							bottom: '10%',
							zIndex: 0,
							transform: 'translate(50%, 50%)'
						}}
						animate={{
							x: [0, -70, 30, 0],
							y: [0, 60, -40, 0],
							scale: [1, 1.3, 0.8, 1],
						}}
						transition={{
							duration: 25,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2
						}}
					/>
				</>
			);

			return <>{backgroundBlobs}{items}</>;
		}
	}

	// Current selected effect (change this to switch effects)
	const currentEffect = 'magneticGrid' // Options: 'blobs', 'waves', 'rings', 'particles', 'droplets', 'magneticGrid'

	// Parallax hooks
	const { scrollYProgress } = useScroll()
	const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
	const subtitleY = useTransform(scrollYProgress, [0, 0.5], [0, -50])
	const heroBgY = useTransform(scrollYProgress, [0, 1], [0, 300])
	const servicesY = useTransform(scrollYProgress, [0.2, 0.8], [100, -100])

	const handleMouseMove = (e) => {
		if (heroRef.current) {
			const rect = heroRef.current.getBoundingClientRect()
			const newX = ((e.clientX - rect.left) / rect.width) * 100
			const newY = ((e.clientY - rect.top) / rect.height) * 100

			// Calculate mouse velocity
			const velocityX = newX - lastMousePosition.x
			const velocityY = newY - lastMousePosition.y

			setMouseVelocity({ x: velocityX, y: velocityY })
			setMousePosition({ x: newX, y: newY })
			setLastMousePosition({ x: newX, y: newY })

			// Influence particle movement based on mouse velocity (smoothed)
			setParticleOrigins(prev =>
				prev.map(particle => ({
					...particle,
					vx: particle.vx + velocityX * 0.005, // Reduced influence for smoother movement
					vy: particle.vy + velocityY * 0.005
				}))
			)
		}
	}

	return (
		<LazyMotion features={domAnimation}>
			<div className="min-h-screen bg-white">
				{/* Hero Section - Dynamic Gradient Background with Fixed Attachment */}
				<section
					ref={heroRef}
					className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
					onMouseMove={handleMouseMove}
				>
					{/* Noise texture overlay - Full screen subtle grain */}
					<div className="fixed inset-0 opacity-10 pointer-events-none z-0">
						<svg className="w-screen h-screen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
							<defs>
								<filter id="noise">
									<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
									<feColorMatrix type="saturate" values="0" />
									<feComponentTransfer>
										<feFuncA type="discrete" tableValues="0 1" />
									</feComponentTransfer>
								</filter>
							</defs>
							<rect width="100%" height="100%" filter="url(#noise)" opacity="0.15" />
						</svg>
					</div>

					{/* Liquid Effects - Dynamic Effect Selection */}
					{liquidEffects[currentEffect]()}

					<div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
						<motion.h1
							className="text-4xl sm:text-5xl lg:text-6xl font-bold font-product text-white mb-6"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							style={{ y: titleY }}
						>
							<span dangerouslySetInnerHTML={{ __html: heroTitle }} />
							<span className="block text-primary" dangerouslySetInnerHTML={{ __html: heroHighlight }} />
						</motion.h1>
						<motion.p
							className="text-lg sm:text-xl mb-12 text-gray-300 max-w-3xl mx-auto"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							style={{ y: subtitleY }}
							dangerouslySetInnerHTML={{ __html: subtitle }}
						/>
						<motion.div
							className="flex flex-row gap-4 justify-center"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
							<Link
								href={ctaPrimaryLink}
								className="inline-flex items-center bg-primary hover:bg-[#b89638] text-white px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg font-semibold gap-2 transition-colors shadow-lg"
							>
								<Play className="w-4 h-4 sm:w-5 sm:h-5" />
								{ctaPrimary}
							</Link>
							<Link
								href={ctaSecondaryLink}
								className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg font-semibold transition-colors shadow-lg"
							>
								{ctaSecondary}
								<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
							</Link>
						</motion.div>
					</div>

					{/* Scroll indicator */}
					<motion.div
						className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1, duration: 0.8 }}
					>
						<motion.div
							className="flex flex-col items-center gap-2 text-white/70"
							animate={{ y: [0, 8, 0] }}
							transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
						>
							<span className="text-sm">Scorri</span>
							<ChevronRight className="w-6 h-6 rotate-90" />
						</motion.div>
					</motion.div>
				</section>

				{/* Services Section */}
				<section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative z-20">
					<motion.div
						className="max-w-6xl mx-auto"
						style={{ y: servicesY }}
					>
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold font-product text-gray-900 mb-4">I Nostri Servizi</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Offriamo soluzioni complete per la tua presenza digitale, dalla strategia alla realizzazione.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{services.map((service, index) => {
								const IconComponent = service.icon
								return (
									<motion.div
										key={service.id}
										className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: index * 0.1 }}
									>
										<div className="mb-6 inline-block p-4 bg-primary/10 rounded-lg">
											<IconComponent className="w-8 h-8 text-primary" />
										</div>
										<h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
										<p className="text-gray-600 mb-4">{service.description}</p>
										<Link
											href={`/servizi/${service.id}`}
											className="text-primary hover:text-[#b89638] font-medium inline-flex items-center gap-1"
										>
											Scopri di più
											<ChevronRight className="w-4 h-4" />
										</Link>
									</motion.div>
								)
							})}
						</div>
					</motion.div>
				</section>

				{/* CTA Section */}
				<section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white relative z-20">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl sm:text-4xl font-bold font-product mb-6">Pronto a iniziare il tuo progetto?</h2>
						<p className="text-xl mb-8 opacity-90">
							Contattaci per una consulenza gratuita e scopri come possiamo aiutarti.
						</p>
						<Link
							href="/contatti"
							className="inline-flex items-center bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold gap-2 transition-colors"
						>
							<Play className="w-5 h-5" />
							Contattaci Ora
						</Link>
					</div>
				</section>
			</div>
		</LazyMotion>
	)
}
