import { useEffect, useState, useMemo } from "react";
import { Blog, getAllBlogs } from "../data/blogs";
import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import BlogGrid from "../components/BlogGrid";


interface HomeProps {
  searchTerm: string;
}

export default function Home({ searchTerm }: HomeProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs once
  useEffect(() => {
    setLoading(true);
    getAllBlogs()
      .then((data) => {
        // Trim categories immediately
        const cleanedData = data.map((b) => ({
          ...b,
          category: b.category ? b.category.trim() : "Uncategorized",
        }));
        setBlogs(cleanedData);
      })
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, []);

  // Unique categories
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(blogs.map((b) => b.category)));
    return ["All", ...uniqueCats.sort()];
  }, [blogs]);

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCategory =
        activeCategory === "All" ||
        b.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, activeCategory, searchTerm]);

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-center py-12 text-red-600">{error}</p>
          ) : (
            <>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={(cat) => setActiveCategory(cat)}
              />

              <BlogGrid blogs={filteredBlogs} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}



