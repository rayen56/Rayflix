import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Details from '../components/movies/Details';
import MovieRecommendation from '../components/movies/MovieRecommendation'
import MovieSimilar from '../components/movies/MovieSimilar';
const MovieDetailsPage = ({ addToWatchlist, watchlist, removeFromWatchlist, addToWatched, watchedList, removeFromWatched }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movie details from the TMDB API based on the movie ID
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  // Function to check if a movie is already in the watchlist
  const isMovieInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  const backgroundStyle = {
    backgroundImage: movie.backdrop_path ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` : '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    position: 'relative',
  };

  return (
    <div style={backgroundStyle}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 " style={{ zIndex: 0 }}></div>
      <Header />
      <Details
        movie={movie}
        addToWatchlist={addToWatchlist}
        watchlist={watchlist}
        removeFromWatchlist={removeFromWatchlist}
        addToWatched={addToWatched}
        watchedList={watchedList}
        removeFromWatched={removeFromWatched}
      />
      <div className="max-w-4xl mx-auto">
      <MovieRecommendation movieId={id} /> 
      <MovieSimilar movieId={id} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
