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

  return(
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home searchTerm={searchTerm}/>
      </PageWrapper>} />
      <Route path="/post/:id" element={<PageWrapper><BlogDetail/></PageWrapper>}/>
      </Routes>
    </AnimatePresence>
  )
}

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
    <Router basename='/blogs' >  
      
      
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
