// TvCard.js
import React ,{ useState} from 'react';
import { Link } from 'react-router-dom';
const TvCard = ({ tvShow }) => {
  const { id, name, poster_path, vote_average, first_air_date } = tvShow;
  const releaseYear = first_air_date ? new Date(first_air_date).getFullYear() : "N/A";
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const truncateTitle = (str, maxLength) => {
  if (!str || typeof str !== 'string') {
    return ''; // Return an empty string if str is not defined or not a string
  }

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

  return (
    <Link to={`/tv/${id}`} className="max-w-xs rounded-lg overflow-hidden shadow-lg m-2 cursor-pointer transform transition-transform hover:scale-105 relative">
      <div
        className="max-w-xs rounded-lg overflow-hidden shadow-lg m-2 cursor-pointer transform transition-transform hover:scale-105 bg-gray-800 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={name} className="w-full h-auto rounded-t-lg" />

        {isHovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300">
            <h2 className="text-white font-bold text-xl mb-2 text-center">{truncateTitle(name, 25)}</h2>
            <p className="text-gray-300 text-sm mb-1">First Air Date: {releaseYear}</p>
            <p className={`${getRatingColor(vote_average)} text-lg font-semibold`}>Rating: {vote_average.toFixed(1)}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default TvCard;
