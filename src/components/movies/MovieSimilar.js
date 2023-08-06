// MovieSimilar.js
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
  } from "swiper/modules";
  import { Swiper, SwiperSlide } from "swiper/react";
  
  
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  
const MovieSimilar = ({ movieId }) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=72a814220967e9899c058deb9f37ed4a`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch similar movies');
        }
        const data = await response.json();
        setSimilarMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    (!similarMovies?.length) ? <h3 className="text-white mb-12 relative text-2xl font-bold">No Similar Movies Found</h3> :
    <div>
        <h2 className="text-2xl font-bold mb-4 text-white relative">Similar Movies</h2>
        <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      loop={false}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 5,
        },
      }}
    >
      {similarMovies.map((movie) => (
          movie.poster_path ? (
            <SwiperSlide key={movie.id}>
              <MovieCard key={movie.id} movie={movie} />
            </SwiperSlide>
          ) : null
        ))}
      <br />
    </Swiper>
      
        
      
    </div>
  );
};

export default MovieSimilar;
