import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import TvDetails from '../components/tv/TvDetails';
import Header from '../components/Header';
import TvRecommendation from '../components/tv/TvRecommendation';
import TvSimilar from '../components/tv/TvSimilar';
const TvDetailsPage = ({ addToWatchlist, watchlist, removeFromWatchlist, addToWatched, watchedList, removeFromWatched}) => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch TV show details from the TMDB API based on the TV show ID
    const fetchTvShowDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch TV show details');
        }
        const data = await response.json();
        setTvShow(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTvShowDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tvShow) {
    return <div>TV Show not found.</div>;
  }

  const backgroundStyle = {
    backgroundImage: tvShow.backdrop_path ? `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})` : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    position: "relative",
  };

  return (
    <div style={backgroundStyle}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 " style={{ zIndex: 0 }}></div>
      <Header />
      <TvDetails tvShow={tvShow}
        addToWatchlist={addToWatchlist}
        watchlist={watchlist}
        removeFromWatchlist={removeFromWatchlist}
        addToWatched={addToWatched}
        watchedList={watchedList}
        removeFromWatched={removeFromWatched} />
      <div className="max-w-4xl mx-auto">
        <TvRecommendation tvShowId={id} />
        <TvSimilar tvShowId={id}/>

        
        
      </div>
    </div>
  );
};

export default TvDetailsPage;
