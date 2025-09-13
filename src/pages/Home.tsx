import { useEffect, useState, useMemo } from "react";
import { Blog, getAllBlogs } from "../data/blogs";
import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import BlogGrid from "../components/BlogGrid";

interface HomeProps {
  searchTerm: string; // ✅ coming from App
}

export default function Home({ searchTerm }: HomeProps) {
  console.log("Home received searchTerm:", searchTerm);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllBlogs()
      .then((data) => {
        console.log("Fetched blogs:", data); // 🔍 Debug
        setBlogs(data);
      })
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(blogs.map((blog) => blog.category.trim()))
    );
    return ["All", ...uniqueCategories.sort((a, b) => a.localeCompare(b))];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (blog) =>
          blog.category.trim().toLowerCase() ===
          activeCategory.trim().toLowerCase()
      );
    }

    console.log(searchTerm)

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      console.log(term)
      filtered = filtered.filter((blog) => {
        // const plainContent = blog.content.replace(/<[^>]+>/g, "");
        return (
          blog.title.toLowerCase().includes(term) ||
          // plainContent.toLowerCase().includes(term) ||
          blog.category.toLowerCase().includes(term)
        );
      });
    }

    console.log("Filtered blogs:", filtered); // 🔍 Debug
    return filtered;
  }, [blogs, activeCategory, searchTerm]);

  useEffect(() => {
    document.title = "SwingPicker Blog";
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center py-12">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  if (error) {
    return <p className="text-center py-12 text-red-600">{error}</p>;
  }

  return (
    <div>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <BlogGrid blogs={filteredBlogs} />
      </div>
    </div>
  );
}



