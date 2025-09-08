import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router> 
      <div className="min-h-screen bg-gray-50">
        <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/post/:id" element={<BlogDetail/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;