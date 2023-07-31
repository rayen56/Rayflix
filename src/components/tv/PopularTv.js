import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TvCard from './TvCard';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MovieListSwipper = () => {
  const [tvShow, setTvShow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/popular?api_key=72a814220967e9899c058deb9f37ed4a&sort_by=popularity.desc"
        );
        setTvShow(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-4xl m-5">Popular Shows Right Now</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={5}
        slidesPerView={1}
        pagination={{
          type: "progressbar", // or "fraction"
          clickable: true,
        }}
        navigation
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
        {tvShow.map((tvShow) => (
          <SwiperSlide key={tvShow.id}>
            <TvCard tvShow={tvShow}  />
          </SwiperSlide>
        ))}
        <br />
      </Swiper>
    </div>
  );
};

export default MovieListSwipper;
