import { portfolioItems } from '../../lib/data';
import Layout from '../../components/Layout';

export default function PortfolioItemPage({ portfolioItem }) {
  if (!portfolioItem) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">Project not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{portfolioItem.title}</h1>
          <p className="text-xl text-gray-600">
            <span className="bg-[#d2ad40] text-white px-3 py-1 rounded-full text-sm">
              {portfolioItem.category}
            </span>
          </p>
        </div>
        
        <div className="mt-12">
          <img
            src={portfolioItem.image}
            alt={portfolioItem.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-12"
          />
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700">{portfolioItem.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = portfolioItems.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const portfolioItem = portfolioItems.find((item) => item.id.toString() === params.id);

  return {
    props: { portfolioItem },
  };
}