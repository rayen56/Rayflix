import React, { useState, useEffect } from 'react';
import TvSeriesCard from './TvCard';
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

const TvSimilar = ({ tvShowId }) => {
  const [similarTvShows, setSimilarTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarTvShows = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowId}/similar?api_key=72a814220967e9899c058deb9f37ed4a`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch similar TV shows');
        }
        const data = await response.json();
        setSimilarTvShows(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchSimilarTvShows();
  }, [tvShowId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white relative">Similar TV Shows</h2>
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
        {similarTvShows.map((tvShow) => (
          tvShow.poster_path ? (
            <SwiperSlide key={tvShow.id}>
              <TvSeriesCard key={tvShow.id} tvShow={tvShow} />
            </SwiperSlide>
          ) : null
        ))}
        <br />
      </Swiper>
    </div>
  );
};

export default TvSimilar;
