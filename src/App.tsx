import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import { Blog, getAllBlogs } from "./data/blogs";

function AnimatedRoutes({searchTerm}: {searchTerm: string}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageWrapper>
            <Home searchTerm={searchTerm}/>
          </PageWrapper>
        } />
        <Route path="/post/:id" element={
          <PageWrapper>
            <BlogDetail/>
          </PageWrapper>
        }/>
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  const fetchAndCacheBlogs = async () => {
    try {
      const data = await getAllBlogs();
      setBlogs(data);
      localStorage.setItem("blogs", JSON.stringify(data));
      localStorage.setItem("blogs_time", Date.now().toString());
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    const storedTime = localStorage.getItem("blogs_time");
    const now = Date.now();

    if (storedBlogs && storedTime && now - parseInt(storedTime) < CACHE_DURATION) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      fetchAndCacheBlogs();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const lastFetched = parseInt(localStorage.getItem("blogs_time") || "0");
        if (Date.now() - lastFetched >= CACHE_DURATION) {
          fetchAndCacheBlogs();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Optional: Background refresh interval for active tabs only
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchAndCacheBlogs();
      }
    }, CACHE_DURATION);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Router basename='/blogs'>  
      <div className="flex flex-col min-h-screen pt-16 overflow-x-hidden">
        {/* Navbar */}
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          blogs={blogs}
        />

        {/* Animated page content */}
        <AnimatedRoutes searchTerm={searchTerm}/>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
