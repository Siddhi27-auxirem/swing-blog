import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Menu, X } from "lucide-react";
import { Blog } from "../data/blogs";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  blogs: Blog[];
}

export default function Navbar({ searchTerm, onSearchChange, blogs }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (value: string) => {
    onSearchChange(value);
    if (value.trim() !== "") setIsModalOpen(true);
    else setIsModalOpen(false);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="https://swingpicker.com" className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
                SwingPicker
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center gap-6">
              {["Home","Community","Features","Algorithms","Pricing","Blog"].map((text, idx) => {
                const links = ["https://swingpicker.com","https://thetradesocial.com","https://swingpicker.com/features","https://swingpicker.com/algos","https://swingpicker.com/pricing","/"];
                return (
                  <Link
                    key={idx}
                    to={links[idx]}
                    className="text-gray-700 hover:text-blue-600 font-medium text-sm sm:text-base truncate"
                  >
                    {text}
                  </Link>
                );
              })}

              {/* Search */}
              <div className="relative flex-shrink flex-grow sm:flex-grow-0 max-w-full sm:max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="block w-full sm:w-auto pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 truncate"
                />
              </div>

              {/* CTA Button */}
              <a
                href="https://swingpicker.com/contact"
                target="_blank"
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
              >
                Start Your Journey
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden">
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
            <div className="xl:hidden border-t border-gray-200 w-full nav-mobile">
              <div className="flex flex-col px-2 pt-2 pb-3 space-y-2">
                {["Home","Community","Features","Algorithms","Pricing","Blog"].map((text, idx) => {
                  const links = ["https://swingpicker.com","https://thetradesocial.com","https://swingpicker.com/features","https://swingpicker.com/algos","https://swingpicker.com/pricing","/"];
                  return (
                    <Link
                      key={idx}
                      to={links[idx]}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium text-sm truncate"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {text}
                    </Link>
                  );
                })}

                {/* Mobile Search */}
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => {
                      handleSearch(e.target.value);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 truncate"
                  />
                </div>

                {/* Mobile CTA */}
                <a
                  href="https://swingpicker.com/contact"
                  className="block mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 text-center whitespace-nowrap"
                >
                  Start Your Journey
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4 sm:p-6">
          <div className="bg-white rounded-xl shadow-xl w-full sm:max-w-2xl md:max-w-4xl max-h-[80vh] overflow-y-auto relative modal-animate">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold p-6 border-b">Search Results</h2>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1 truncate">
                        {blog.category}
                      </p>
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
