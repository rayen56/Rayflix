import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Movies = ({ addToWatchlist, watchlist }) => {
  const [movies, setMovies] = useState([]); // Initialize 'movies' state with an empty array

  useEffect(() => {
    // Function to fetch movies from TMDb API
    const fetchMovies = async () => {
      try {
        const apiKey = '72a814220967e9899c058deb9f37ed4a';
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const handleMouseEnter = (movieId) => {
    setHoveredMovieId(movieId);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
  };

  // Function to check if a movie is already in the watchlist
  const isMovieInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-4xl m-5">Popular Right Now</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="border rounded-lg overflow-hidden relative"
              onMouseEnter={() => handleMouseEnter(movie.id)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-56 object-cover"
              />
              {hoveredMovieId === movie.id && (
                <div>
                  {isMovieInWatchlist(movie.id) ? (
                    <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded">
                      <FontAwesomeIcon icon={faCheck} /> Added
                    </div>
                  ) : (
                    <button
                      className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => addToWatchlist(movie)}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add to watchlist
                    </button>
                  )}
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-gray-600">{movie.release_date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Movies;
