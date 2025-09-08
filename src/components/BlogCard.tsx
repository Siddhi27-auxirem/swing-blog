import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Blog } from '../data/blogs';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/3 aspect-video md:aspect-square overflow-hidden">
          <img
            src={blog.images}
            alt={blog.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Content Section */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {blog.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {blog.readTime}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {blog.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{blog.description}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{blog.updated_On}</span>
            <Link
              to={`/post/${blog.id}`}
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}