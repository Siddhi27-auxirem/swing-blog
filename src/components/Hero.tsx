import React, { useEffect } from 'react';

export default function Hero() {


  return (
    <section className="bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100 text-gray-800 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
          Market <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">Insights</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Master the markets with expert insights, proven strategies, and practical guidance.
          Your journey to trading success starts here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="bg-white/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-300">
            <span className="text-gray-800 text-sm">Latest insights on market trends</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-300">
            <span className="text-gray-800 text-sm">Expert trading strategies</span>
          </div>
        </div>
      </div>
    </section>

  );
}