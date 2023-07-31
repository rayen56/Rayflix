import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';
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

const RelatedMovies = ({ castId }) => {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(12); // Number of movies to display initially

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch related movies');
        }
        const data = await response.json();
        // Filter out movies without a poster_path
        const moviesWithPoster = data.cast.filter((movie) => movie.poster_path !== null);
        setRelatedMovies(moviesWithPoster);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRelatedMovies();
  }, [castId]);

  if (loading) {
    return <div className="text-white py-8">Loading related movies...</div>;
  }

  const handleShowMore = () => {
    // Increase the limit to show more movies
    setLimit((prevLimit) => prevLimit + 8);
  };

  return (
    <div>
        <h2 className="text-2xl font-bold  mt-8 mb-4 text-white relative">Related Movies</h2>
        <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
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
      {relatedMovies.map((movie) => (
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

export default RelatedMovies;
