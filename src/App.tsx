import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';

if(process.env.NODE_ENV==="production"){
  console.log = () =>{}
  console.warn = () =>{}
  console.error = () =>{}
  console.trace = () =>{}
}


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  console.log("App searchTerm:", searchTerm);

  return (
     <Router basename='/blogs'> 
      
      <div className="min-h-screen bg-gray-50">
        {/* Navbar always visible */}
        <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />


  <Routes>
          {/* Pass searchTerm into Home */}
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/post/:id" element={<BlogDetail/>} />
        </Routes>


      

        <Footer />
      </div>
    </Router>
  );
}

export default App;
