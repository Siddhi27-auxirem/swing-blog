import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Menu, X } from "lucide-react";
import { Blog } from "../data/blogs";

//added blogs prop
interface NavbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  blogs: Blog[]; //new prop for search results
}

//added isModalOpen state
export default function Navbar({ searchTerm, onSearchChange, blogs }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); //track search modal visibility

  //replaced onChange logic for search input
  const handleSearch = (value: string) => {
    onSearchChange(value);

    if (value.trim() !== "") {
      setIsModalOpen(true); // ✅ open modal if search term exists
    } else {
      setIsModalOpen(false); // close modal if empty
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="https://swingpicker.com/"
              className="flex items-center space-x-2 group"
            >
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors duration-200">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SwingPicker</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link
                to="https://thetradesocial.com/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Community
              </Link>
              <Link
                to="https://swingpicker.com/features"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Features
              </Link>
              <Link
                to="https://swingpicker.com/algos/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Algorithms
              </Link>
              <Link
                to="https://swingpicker.com/pricing"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Pricing
              </Link>
              <Link
                to="/blogs"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Blog
              </Link>

              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)} //This allows showing a popup modal instead of redirecting or just updating state.
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* CTA Button */}
              <a
                href="https://swingpicker.com/contact"
                target="_blank"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Start Your Journey
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="https://swingpicker.com/"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="https://thetradesocial.com"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Community
                </Link>
                <Link
                  to="https://swingpicker.com/features"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="https://swingpicker.com/algos"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Algorithms
                </Link>
                <Link
                  to="https://swingpicker.com/pricing"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/blogs"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>

                {/* Mobile Search */}
                <div className="relative mt-3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => {       //This keeps mobile behavior consistent with desktop search.
                      handleSearch(e.target.value);
                      setIsMenuOpen(false); //closes mobile menu
                    }}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <a
                  href="https://swingpicker.com"
                  className="block mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                >
                  Start Your Journey
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- Search Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-6">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto relative modal-animate">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold p-6 border-b">Search Results</h2>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/post/${blog.id}`}
                    className="border rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden bg-white"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {blog.images?.length > 0 && (
                      <img
                        src={blog.images[0]}
                        alt={blog.title}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{blog.category}</p>
                      <p className="text-gray-500 text-sm line-clamp-3">
                        {blog.metaDescription}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 col-span-full">
                  No blogs found for "{searchTerm}".
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
