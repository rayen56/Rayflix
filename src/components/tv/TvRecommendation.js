import React, { useState, useEffect } from 'react';
import TvSeriesCard from './TvCard';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TvRecommendation = ({ tvShowId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?api_key=72a814220967e9899c058deb9f37ed4a`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch TV show recommendations');
        }
        const data = await response.json();
        setRecommendations(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [tvShowId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {recommendations?.length ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-white relative">You might also like</h2>
          <Swiper
            modules={[Navigation, Pagination, A11y, Scrollbar]}
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
            {recommendations.map((tvShow) => (
              tvShow.poster_path ? (
                <SwiperSlide key={tvShow.id}>
                  <TvSeriesCard key={tvShow.id} tvShow={tvShow} />
                </SwiperSlide>
              ) : null
            ))}
          </Swiper>
        </>
      ) : (
        <h3 className="text-white mb-12 relative text-2xl font-bold">No Recommendations Tv Found</h3>
      )}
    </div>
  );
};

export default TvRecommendation;
