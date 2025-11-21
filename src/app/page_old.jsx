import HomePage from '@/components/HomePage'

export default function Home({ searchParams }) {
  const layoutVariant = searchParams?.layout === 'alt' ? 'alternate' : 'default'

  return (
    <div className="min-h-screen bg-white">
      <main>
        <HomePage variant={layoutVariant} />
      </main>
    </div>
  )
}
