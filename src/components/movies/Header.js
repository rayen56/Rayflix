
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="py-4 bg-gray-900 text-white">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-semibold">
            Movie App
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/watchlist" className="hover:text-gray-300">Watchlist</Link>
            {/* Add more navigation links if needed */}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
