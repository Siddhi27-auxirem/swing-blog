import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import { Blog, getAllBlogs } from "./data/blogs";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  // Fetch blogs once
  useEffect(() => {
    getAllBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <Router basename='/blogs'>    
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        {/* Navbar */}
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          blogs={blogs}
        />

        {/* Page Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/post/:id" element={<BlogDetail />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
