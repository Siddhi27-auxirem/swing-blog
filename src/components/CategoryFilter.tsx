import React from "react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-white py-6 sm:py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const cleanCategory = category.trim();
            const isActive =
              activeCategory.trim().toLowerCase() === cleanCategory.toLowerCase();

            return (
              <button
                key={cleanCategory}
                onClick={() => onCategoryChange(cleanCategory)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } truncate`}
              >
                {cleanCategory}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
