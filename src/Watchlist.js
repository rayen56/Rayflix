import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faVideo, faTv } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Watchlist = ({ watchlist, removeFromWatchlist, clearWatchlist }) => {
  const [showMovies, setShowMovies] = useState(true);
  const [showTVShows, setShowTVShows] = useState(true);

  const handleRemove = (item) => {
    removeFromWatchlist(item.id);
  };

  const handleClearAll = () => {
    const shouldClear = window.confirm('Are you sure you want to clear your entire watchlist?');
    if (shouldClear) {
      clearWatchlist();
    }
  };

  const handleShowAll = () => {
    setShowMovies(true);
    setShowTVShows(true);
  };

  const handleShowMovies = () => {
    setShowMovies(true);
    setShowTVShows(false);
  };

  const handleShowTVShows = () => {
    setShowMovies(false);
    setShowTVShows(true);
  };

  const filteredWatchlist = watchlist.filter((item) => {
    if (showMovies && showTVShows) {
      return true;
    } else if (showMovies) {
      return item.release_date;
    } else if (showTVShows) {
      return item.first_air_date;
    }
    return false;
  });

  const movieCount = watchlist.filter((item) => item.release_date).length; // Get the number of movies in the watchlist
  const tvShowCount = watchlist.filter((item) => item.first_air_date).length; // Get the number of TV shows in the watchlist
  const totalCount = movieCount + tvShowCount; // Calculate the total count
  return (
    <>
     <header className="py-4 bg-gray-900  text-white">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center ">
          <Link to="/" className="text-2xl font-semibold tracking-widest uppercase">
          Rayflix
          </Link>
          <div className="space-x-6  ">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/movies" className="hover:text-gray-300">Movies</Link>
            <Link to="/tvshow" className='hover:text-gray-300'>TV Shows</Link>
            <Link to="/watchlist" className="hover:text-gray-300">Watchlist</Link>
            <Link to="/watched" className='hover:text-gray-300'>Watched</Link>
            {/* Add more navigation links if needed */}
          </div>
        </nav>
      </div>
    </header>
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4">My Watchlist</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            className={`hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-600 transition-colors duration-300 ${
              showMovies && showTVShows ? 'bg-gray-300' : 'bg-gray-200'
            }`}
            onClick={handleShowAll}
          >
            All ({totalCount})
          </button>
          <button
            className={`hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-600 transition-colors duration-300 ${
              showMovies && !showTVShows ? 'bg-gray-300' : 'bg-gray-200'
            }`}
            onClick={handleShowMovies}
          >
            <FontAwesomeIcon icon={faVideo} />  Movies ({movieCount})
          </button>
          <button
            className={`hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-600 transition-colors duration-300 ${
              !showMovies && showTVShows ? 'bg-gray-300' : 'bg-gray-200'
            }`}
            onClick={handleShowTVShows}
          >
            <FontAwesomeIcon icon={faTv} /> TV Shows ({tvShowCount})
          </button>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
      {filteredWatchlist.length === 0 ? (
        <p className="text-gray-600">Your watchlist is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredWatchlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-96 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{item.title || item.name}</h2>
                  {item.release_date ? ( // Check if it's a movie
                    <p className="text-gray-600 text-sm mb-4">Release Date: {item.release_date}</p>
                  ) : (
                    <p className="text-gray-600 text-sm mb-4">First Air Date: {item.first_air_date}</p>
                  )}
                  <button
                    className="block w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                    onClick={() => handleRemove(item)}
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" /> Remove from WatchList
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default Watchlist;
