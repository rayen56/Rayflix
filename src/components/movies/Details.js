import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlayCircle,
  faPlus,
  faCheck,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import MovieCast from "./MovieCast";
const Details = ({
  movie,
  addToWatchlist,
  watchlist,
  removeFromWatchlist,
  addToWatched,
  watchedList,
  removeFromWatched,
}) => {
  const {
    id,
    title,
    overview,
    release_date,
    poster_path,
    vote_average,
    backdrop_path,
    tagline,
    genres,
    runtime,
  } = movie;
  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : "N/A";

  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie trailer");
        }
        const data = await response.json();
        const trailer = data.results.find((video) => video.type === "Trailer");
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
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
    }
  };
  const isMovieInWatchlist = (movieId) => {
    return watchlist && watchlist.some((movie) => movie.id === movieId);
  };

  const isMovieInWatched = (movieId) => {
    return watchedList && watchedList.some((movie) => movie.id === movieId);
  };
  const handleMarkAsWatched = () => {
    if (isMovieInWatched(id)) {
      removeFromWatched(id);
    } else {
      addToWatched(movie);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div
          className="max-w-4xl w-full mx-4 p-8 rounded-lg overflow-hidden bg-white bg-opacity-30 shadow-xl backdrop-blur-lg text-white relative z-10"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
            <div
              className="relative w-44 h-auto rounded shadow-lg mr-8 mb-4 md:mb-0 cursor-pointer overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={playTrailer}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                className={`w-full h-auto rounded ${
                  isHovered ? "transform scale-105 transition-transform" : ""
                }`}
              />
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className="text-white text-5xl"
                  />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{title}</h1>
              <p className="text-yellow-400 text-2xl mt-2">
                {vote_average.toFixed(1)}
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-400 ml-1 text-1xl"
                />
              </p>
              <p className="text-gray-300 text-lg mb-2">{tagline}</p>
              <p className="text-slate-200 text-lg mb-2">
                {new Date(release_date).getFullYear()} |{" "}
                {genres.map((genre) => genre.name).join(", ")} | {runtime} min
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
                    onClick={() => addToWatchlist(movie)}
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
          <MovieCast movieId={id} />
        </div>
      </div>
    </div>
  );
};

export default Details;
