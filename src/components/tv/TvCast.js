import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar"; // Import scrollbar styles

const TvCast = ({ tvShowId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=72a814220967e9899c058deb9f37ed4a`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch TV show cast');
        }
        const data = await response.json();
        setCast(data.cast);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCast();
  }, [tvShowId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg p-4">
      {cast?.length ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-white">Tv Cast</h2>
          <Swiper
            spaceBetween={10}
            slidesPerView={6}
            navigation={false}
            scrollbar={{ draggable: true }}
            loop={false}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
            modules={[Scrollbar]}
            className="mySwiper"
          >
            {cast.map((actor) => (
              actor.profile_path && actor.character ? (
                <SwiperSlide key={actor.id}>
                  <Link to={`/cast/${actor.id}`}>
                    <div className="text-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                      />
                      <p className="text-white font-semibold">{actor.name}</p>
                      <p className="text-gray-300 text-sm">{actor.character}</p>
                      <br />
                    </div>
                  </Link>
                </SwiperSlide>
              ) : null
            ))}
          </Swiper>
        </>
      ) : (
        <h3 className="text-white mb-12 relative text-2xl font-bold">No TV Show Cast Found</h3>
      )}
    </div>
  );
};

export default TvCast;
