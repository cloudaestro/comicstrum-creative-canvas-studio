
import React from "react";
import { Link } from "react-router-dom";
import AnimatedLogo from "./ui/AnimatedLogo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-comic-darkGray text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <AnimatedLogo />
              <span className="font-heading font-bold text-xl">ComicStrum</span>
            </Link>
            <p className="text-comic-lightGray text-sm">
              AI-powered comic creation platform that brings your stories to life
              with stunning visuals and intuitive tools.
            </p>
          </div>

          {/* Product Links */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/workspace"
                  className="text-comic-lightGray hover:text-white transition-colors duration-200 text-sm"
                >
                  Create Comics
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-comic-lightGray hover:text-white transition-colors duration-200 text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-comic-lightGray hover:text-white transition-colors duration-200 text-sm"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-lg mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#tutorials"
                  className="text-comic-lightGray hover:text-white transition-colors duration-200 text-sm"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-comic-lightGray hover:text-white transition-colors duration-200 text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="text-comic-lightGray hover:text-white transition-colors duration-200 text-sm"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="md:col-span-1">
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-comic-lightGray hover:text-white transition-colors duration-200 text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-comic-lightGray hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-comic-lightGray hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-700 text-center md:text-left md:flex md:justify-between md:items-center">
          <p className="text-comic-lightGray text-xs">
            &copy; {new Date().getFullYear()} ComicStrum. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-comic-lightGray text-xs">
              Made with ❤️ for creative storytellers everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
