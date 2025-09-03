import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import BlogGrid from '../components/BlogGrid';
import LatestBlogs from '../components/LatestBlogs';
import { blogs } from '../data/blogs';

interface HomeProps {
  searchTerm: string;
}

export default function Home({ searchTerm }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(blogs.map(blog => blog.category)))];

  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchLower) ||
        blog.description.toLowerCase().includes(searchLower) ||
        blog.category.toLowerCase().includes(searchLower) ||
        blog.content.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [activeCategory, searchTerm]);

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