import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 800);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 bg-gray-900 ${
        isScrolled ? 'bg-gray-900 bg-opacity-90 shadow-lg' : ' bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-semibold tracking-widest uppercase ${
            isScrolled ? 'text-white' : 'text-white'
          }`}
        >
          Rayflix
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`text-white hover:text-gray-300 transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/movies"
            className={`text-white hover:text-gray-300 transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}
          >
            Movies
          </Link>
          <Link
            to="/tvshow"
            className={`text-white hover:text-gray-300 transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}
          >
            TV Shows
          </Link>
          <Link
            to="/watchlist"
            className={`text-white hover:text-gray-300 transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}
          >
            Watchlist
          </Link>
          <Link
            to="/watched"
            className={`text-white hover:text-gray-300 transition-colors duration-300 ${
              isScrolled ? 'text-white' : 'text-white'
            }`}
          >
            Watched
          </Link>
          {/* Add more navigation links if needed */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className={`w-8 h-8 ${isMobileMenuOpen ? 'text-white' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 bg-opacity-90">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`block py-3 px-6 text-white hover:text-gray-300 transition-colors duration-300`}
              >
                Home
              </Link>
              <Link
                to="/movies"
                className={`block py-3 px-6 text-white hover:text-gray-300 transition-colors duration-300`}
              >
                Movies
              </Link>
              <Link
                to="/tvshow"
                className={`block py-3 px-6 text-white hover:text-gray-300 transition-colors duration-300`}
              >
                TV Shows
              </Link>
              <Link
                to="/watchlist"
                className={`block py-3 px-6 text-white hover:text-gray-300 transition-colors duration-300`}
              >
                Watchlist
              </Link>
              <Link
                to="/watched"
                className={`block py-3 px-6 text-white hover:text-gray-300 transition-colors duration-300`}
              >
                Watched
              </Link>
              {/* Add more mobile menu links if needed */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
