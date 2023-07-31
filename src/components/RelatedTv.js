import React, { useState, useEffect } from 'react';
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
import TvCard from './tv/TvCard';

const RelatedTv = ({ castId }) => {
  const [relatedTvShows, setRelatedTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchRelatedTvShows = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${castId}/tv_credits?api_key=72a814220967e9899c058deb9f37ed4a&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch related TV shows');
        }
        const data = await response.json();
        // Filter out TV shows without a poster_path
        const tvShowsWithPoster = data.cast.filter((tvShow) => tvShow.poster_path !== null);
        setRelatedTvShows(tvShowsWithPoster); // Correctly set the TV show data here
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    

    fetchRelatedTvShows();
  }, [castId]);

  if (loading) {
    return <div className="text-white py-8">Loading related TV shows...</div>;
  }


  return (
    <div>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-white relative">Related Tv</h2>
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
      {relatedTvShows.map((tvShow) => (
  tvShow.poster_path ? (
    <SwiperSlide key={tvShow.id}>
      <TvCard key={tvShow.id} tvShow={tvShow} />
    </SwiperSlide>
  ) : null
))}

      <br />
    </Swiper>
      
        
      
    </div>
  );
};

export default RelatedTv;
