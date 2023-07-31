import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MediaCard = ({ media }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!media) {
    return null; // If media is undefined, return null (or some placeholder content)
  }

  const { id, name, title, poster_path, vote_average, first_air_date, release_date, media_type } = media;
  const releaseYear = (first_air_date || release_date) ? new Date(first_air_date || release_date).getFullYear() : "N/A";

  const truncateTitle = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength - 3) + "..." : str;
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link to={`/${media_type}/${id}`} className="max-w-xs rounded-lg overflow-hidden shadow-lg m-2 cursor-pointer transform transition-transform hover:scale-105 relative">
      <div
        className="max-w-xs rounded-lg overflow-hidden shadow-lg m-2 cursor-pointer transform transition-transform hover:scale-105 bg-gray-800 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={name || title}className="w-full h-auto rounded-t-lg" />
        {isHovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <h2 className="text-white font-bold text-xl mb-2 text-center">{truncateTitle(name || title, 25)}</h2>
            <p className="text-gray-300 text-sm mb-1">{media_type === 'tv' ? 'First Air Date' : 'Release Date'}: {releaseYear}</p>
            {vote_average !== undefined && (
              <p className={`${getRatingColor(vote_average)} text-lg font-semibold`}>Rating: {vote_average.toFixed(1)}</p>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MediaCard;
