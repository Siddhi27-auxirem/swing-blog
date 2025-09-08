import { useEffect, useState, useMemo } from 'react';
import { Blog, getAllBlogs } from '../data/blogs';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import BlogGrid from '../components/BlogGrid';
import LatestBlogs from '../components/LatestBlogs';

interface HomeProps {
  searchTerm: string;
}

export default function Home({ searchTerm }: HomeProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs from backend
  useEffect(() => {
    setLoading(true);
    getAllBlogs()
      .then((data) => setBlogs(data))
      .catch(() => setError('Failed to load blogs'))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Unique + sorted categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(blogs.map(blog => blog.category.trim()))
    );
    return ['All', ...uniqueCategories.sort((a, b) => a.localeCompare(b))];
  }, [blogs]);

  // ✅ Filter blogs by category + search term
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(
        blog =>
          blog.category.trim().toLowerCase() ===
          activeCategory.trim().toLowerCase()
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        blog =>
          blog.title.toLowerCase().includes(term) ||
          blog.description.toLowerCase().includes(term) ||
          blog.category.toLowerCase().includes(term) ||
          blog.content.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [blogs, activeCategory, searchTerm]);

  if (loading) return <p className="text-center py-12">Loading blogs...</p>;
  if (error) return <p className="text-center py-12 text-red-600">{error}</p>;

  return (
    <div>
      <Hero />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <BlogGrid blogs={filteredBlogs} />
      {!searchTerm && activeCategory === 'All' && <LatestBlogs blogs={blogs} />}
    </div>
  );
}
