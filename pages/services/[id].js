import { services } from '../../lib/data';
import Layout from '../../components/Layout';

export default function ServicePage({ service }) {
  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">Service not found</div>
      </Layout>
    );
  }

  // Parallax effect setup (Framer Motion)
  // You can further tune the effect in the next step
  return (
    <Layout noPadding>
      {/* Title on white background with extra top padding for header */}
      <div className="w-full bg-white pt-32 pb-10 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 text-center">{service.title}</h1>
      </div>
      {/* Placeholder image with title overlay */}
          <div className="relative w-full h-[250px] flex items-center justify-center overflow-hidden mb-8">
            <img
              src={`https://placehold.co/1200x250/222/fff?text=${encodeURIComponent(service.title)}`}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
      {/* Main content on white background */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-xl text-gray-700 mb-6">{service.description}</p>
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700 leading-relaxed">{service.details}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const paths = services.map((service) => ({
    params: { id: service.id },
  }));

  return { paths, fallback: false };
}

// This function gets called at build time
export async function getStaticProps({ params }) {
  const service = services.find((s) => s.id === params.id);

  return {
    props: { service },
  };
}