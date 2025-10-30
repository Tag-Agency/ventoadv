import { blogPosts } from '../../lib/data';
import Layout from '../../components/Layout';

export default function BlogPostPage({ post }) {
  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">Post not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article>
          <div className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span className="bg-[#d2ad40] text-white px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">By {post.author}</span>
            </div>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg mb-12"
          />

          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed">{post.excerpt}</p>
            {/* Qui puoi aggiungere il contenuto completo del post */}
          </div>
        </article>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((p) => p.id.toString() === params.id);

  return {
    props: { post },
  };
}