
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AnimatedLogo from "./ui/AnimatedLogo";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Workspace", path: "/workspace" },
    { label: "About", path: "/about" },
  ];

  return (
    <header className="bg-white shadow-sm py-4 px-6 z-50 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <AnimatedLogo />
          <span className="font-heading font-bold text-xl text-comic-purple">
            ComicStrum
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-comic-gray hover:text-comic-purple transition-colors duration-200 font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Button className="bg-comic-purple hover:bg-opacity-90">
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-comic-gray focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 z-50 animate-fade-in">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block text-comic-gray hover:text-comic-purple transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button className="w-full bg-comic-purple hover:bg-opacity-90">
                Get Started
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
