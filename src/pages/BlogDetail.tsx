import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Blog, getAllBlogs, getBlogById } from '../data/blogs';

// ✅ Utility function to resize images
function resizeImagesInContent(html: string): string {
  return html.replace(/<img([^>]*)>/g, (match, attributes) => {
    const cleaned = attributes
      .replace(/width="[^"]*"/g, '')
      .replace(/height="[^"]*"/g, '');
    return `<img ${cleaned} style="max-width:400px; height:auto; display:block; margin:auto;" />`;
  });
}

// ✅ Format date in IST
export function formatDateIST(dateString: string) {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return dateString;
  }
}

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [suggestedBlogs, setSuggestedBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  function stripImagesFromHtml(html: string): string {
    return html.replace(/<img[^>]*>/g, '').replace(/<[^>]+>/g, '');
  }

  // Fetch blog by ID
  useEffect(() => {
    if (!id) return;

    getBlogById(id)
      .then((data) => setBlog(data))
      .catch((err) => console.error('Error fetching blog:', err))
      .finally(() => setLoading(false));

    getAllBlogs()
      .then((data) =>
        setSuggestedBlogs(data.filter((b) => b.id !== id).slice(0, 3))
      )
      .catch((err) => console.error('Error fetching suggested blogs:', err));
  }, [id]);

  // ✅ Dynamic title
  useEffect(() => {
    if (blog?.title) {
      document.title = `${blog.title} | SwingPicker`;
    } else {
      document.title = 'SwingPicker Blog';
    }
  }, [blog]);

  // ✅ Improved scroll handling
  useEffect(() => {
    if (!loading && blog) {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, [loading, blog]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center py-12">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {blog.category}
            </span>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              {/* ✅ Show created_on in IST */}
              {formatDateIST(blog.created_On || blog.updated_On)}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>
        </header>

        {/* Featured Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img
            src={blog.thumbnailImage}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Full Blog Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-headings:font-bold"
          dangerouslySetInnerHTML={{
            __html: resizeImagesInContent(blog.content),
          }}
        />
      </article>

      {/* Suggested Blogs */}
      {suggestedBlogs.length > 0 && (
        <section className="bg-white py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Suggested Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedBlogs.map((suggestedBlog) => (
                <Link
                  key={suggestedBlog.id}
                  to={`/post/${suggestedBlog.id}`}
                  state={{ blog: suggestedBlog }}
                  className="group block"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={suggestedBlog.thumbnailImage}
                        alt={suggestedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded mb-2">
                        {suggestedBlog.category}
                      </span>
                      {/* ✅ Fixed navigation bug */}
                      <h3
                        className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
                        onClick={() => navigate(`/post/${suggestedBlog.id}`)}
                      >
                        {suggestedBlog.title}
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: stripImagesFromHtml(
                            suggestedBlog.content || ''
                          ),
                        }}
                        className="text-sm text-gray-600 line-clamp-2 mb-3"
                      />

                      <div className="flex items-center justify-between">
                
                        <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
