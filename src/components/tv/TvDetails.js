import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlayCircle,
  faPlus,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import TvCast from "./TvCast";
const TvDetails = ({ tvShow, addToWatchlist,
  watchlist,
  removeFromWatchlist,
  addToWatched,
  watchedList,
  removeFromWatched, }) => {
  const { id, name, overview, first_air_date, poster_path, vote_average, backdrop_path, tagline, genres, episode_run_time, number_of_episodes, number_of_seasons } = tvShow;
  const releaseYear = first_air_date ? new Date(first_air_date).getFullYear() : 'N/A';

  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch TV show trailer');
        }
        const data = await response.json();
        const trailer = data.results.find((video) => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrailer();
  }, [id]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const playTrailer = () => {
    if (trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
    }
  };
  const isMovieInWatchlist = (tvShowID) => {
    return watchlist && watchlist.some((tvShow) => tvShow.id === tvShowID);
  };

  const isMovieInWatched = (tvShowID) => {
    return watchedList && watchedList.some((tvShow) => tvShow.id === tvShowID);
  };
  const handleMarkAsWatched = () => {
    if (isMovieInWatched(id)) {
      removeFromWatched(id);
    } else {
      addToWatched(tvShow);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-4xl w-full mx-4 p-8 rounded-lg overflow-hidden bg-white bg-opacity-30 shadow-xl backdrop-blur-lg text-white relative z-10" style={{ backdropFilter: 'blur(10px)' }}>
          <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
            <div
              className="relative w-44 h-auto rounded shadow-lg mr-8 mb-4 md:mb-0 cursor-pointer overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={playTrailer}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={name}
                className={`w-full h-auto rounded ${isHovered ? 'transform scale-105 transition-transform ' : ''}`}
              />
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                  <FontAwesomeIcon icon={faPlayCircle} className="text-white text-5xl" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{name}</h1>
              <p className="text-yellow-400 text-2xl mt-2">
                {vote_average ? vote_average.toFixed(1) : 'N/A'}
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-1 text-1xl" />
              </p>
              <p className="text-gray-300 text-lg mb-2">{tagline}</p>
              <p className="text-slate-200 text-lg mb-2">
                {new Date(first_air_date).getFullYear()} |{' '}
                {genres && Array.isArray(genres) ? genres.map((genre) => genre.name).join(', ') : 'N/A'} |{' '}
                {episode_run_time && episode_run_time.length > 0 ? episode_run_time[0] : 'N/A'} min
              </p>
              <p>
                {number_of_seasons} {number_of_seasons === 1 ? 'Season' : 'Seasons'} |{' '}
                {number_of_episodes} {number_of_episodes === 1 ? 'Episode' : 'Episodes'}
              </p>
              <div className="container text-center space-x-5">
                {isMovieInWatchlist(id) ? (
                  <div
                    className="bg-gray-500 text-white py-2 px-4 rounded mt-4 hover:bg-red-500 transition-all duration-300"
                    onClick={() => removeFromWatchlist(id)}
                  >
                    <FontAwesomeIcon icon={faCheck} className="mr-2" /> Added
                    (Click to Remove from Watchlist)
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                    onClick={() => addToWatchlist(tvShow)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add to
                    Watchlist
                  </button>
                )}

                {isMovieInWatched(id) ? (
                  <div
                    className="flex items-center bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-500 transition-all duration-300"
                    onClick={handleMarkAsWatched}
                  >
                    <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />{" "}
                    Watched (Click to Unmark)
                  </div>
                ) : (
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded mt-2"
                    onClick={handleMarkAsWatched}
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-2" /> Mark as
                    Watched
                  </button>
                )}
              </div>
              
            </div>
          </div>
          <p className="text-white text-opacity-80 text-lg leading-7">
            {overview}
          </p>
          <TvCast tvShowId={id} />
        </div>
      </div>
    </div>
  );
}

export default TvDetails;
