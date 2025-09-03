import React from 'react';
import { TrendingUp, Mail, Twitter, Linkedin, Github, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SwingPicker</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your trusted source for trading insights, market analysis, and proven strategies. 
              Join thousands of traders on their journey to financial success.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/TradZoo" className="text-gray-400 hover:text-white transition-colors duration-200" target='_blank'>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/tradzoo/" className="text-gray-400 hover:text-white transition-colors duration-200" target='_blank'>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/channel/UC6cO64zBUFLakJW-QZWYONg" className="text-gray-400 hover:text-white transition-colors duration-200"  target='_blank'>
                <Youtube className="w-5 h-5" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Message className="w-5 h-5" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://swingpicker.com/about" className="text-gray-400 hover:text-white transition-colors duration-200" target='_blank'>
                  About Us
                </a>
              </li>
              <li>
                <a href="https://swingpicker.com/contact" className="text-gray-400 hover:text-white transition-colors duration-200" target='_blank'>
                  Contact
                </a>
              </li>
              <li>
                <a href="https://swingpicker.com/privacy" className="text-gray-400 hover:text-white transition-colors duration-200" target='_blank'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://swingpicker.com/terms" className="text-gray-400 hover:text-white transition-colors duration-200" target='_blank'>
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://swingpicker.com/features" className="text-gray-400 hover:text-white transition-colors duration-200" target='_blank'>
                  Features
                </a>
              </li>
              <li>
                <a href="https://swingpicker.com/algos" className="text-gray-400 hover:text-white transition-colors duration-200" target='_blank'>
                  Strategies
                </a>
              </li>
              <li>
                <a href="https://swingpicker.com/pricing" className="text-gray-400 hover:text-white transition-colors duration-200" target='_blank'>
                  Pricing
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Tools
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 SwingPicker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}