import React from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom'; // Add this import

const MovieCard = ({ movie }) => {
  const { title, release_date, poster_path, vote_average, id } = movie;
  const releaseYear = release_date ? new Date(release_date).getFullYear() : "N/A";
  const [isHovered, setIsHovered] = useState(false);
  

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const getRatingColor = (rating) => {
    if (rating >= 8) {
      return "text-green-500";
    } else if (rating >= 6) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };
  return (
   
    <Link to={`/movie/${id}`} className="max-w-xs rounded-lg overflow-hidden shadow-lg m-2 cursor-pointer transform transition-transform hover:scale-105 relative">
    <div
      className="max-w-xs rounded-lg overflow-hidden shadow-lg m-2 cursor-pointer transform transition-transform hover:scale-105 bg-gray-800 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className="w-full h-auto rounded-t-lg" />

      {isHovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <h2 className="text-white font-bold text-xl mb-2 text-center">{title}</h2>
          <p className="text-gray-300 text-sm mb-1">{release_date}</p>
          <p className={`${getRatingColor(vote_average)} text-lg font-semibold`}>Rating: {vote_average.toFixed(1)}</p>
        </div>
      )}
    </div>
  </Link>
  );
};

export default MovieCard;
