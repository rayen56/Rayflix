import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

const HeroSection = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/all/day?api_key=72a814220967e9899c058deb9f37ed4a"
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=72a814220967e9899c058deb9f37ed4a"
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full h-screen relative bg-cover bg-center overflow-hidden">
      <Swiper
          spaceBetween={0}
          effect="fade"
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >

          {/* Render both movies and TV shows */}
          {trendingMovies.map((media) => (
            <SwiperSlide key={media.id}>
              <div
                className="relative h-screen flex items-center justify-center"
              >
                {/* Media Backdrop Image */}
                <img
                  src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
                  alt={media.title || media.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                  <div className="w-full md:w-3/5 lg:w-1/2 xl:w-1/3 p-6 text-white">
                    {/* Add Banner */}
                    <div
                      className={`${
                        media.media_type === "movie" ? "bg-blue-500" : "bg-red-500"
                      } text-white px-4 py-2 text-base font-semibold absolute bottom-0 right-0 rounded-bl-md`}
                    >

                      {media.media_type === "movie" ? "Movie" : "TV Show"}
                    </div>
                    {/* Media Release Year and Rating */}
                    <div className="flex items-center mb-4">
                      {media.media_type === "movie" && media.release_date ? (
                        <>
                          <span className="text-lg md:text-xl font-semibold">
                            {new Date(media.release_date).getFullYear()}
                          </span>
                          <span className="text-lg md:text-xl mx-2">|</span>
                        </>
                      ) : media.media_type === "tv" && media.first_air_date ? (
                        <>
                          <span className="text-lg md:text-xl font-semibold">
                            {new Date(media.first_air_date).getFullYear()}
                          </span>
                          <span className="text-lg md:text-xl mx-2">|</span>
                        </>
                      ) : null}
                      {/* Animate Ratings */}
                      <span className="text-lg md:text-xl font-semibold animate-pulse">
                        {media.vote_average.toFixed(1)}
                      </span>
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400 ml-1 text-xl md:text-2xl animate-pulse"
                      />
                    </div>
                    {/* Media Title */}
                    <a
                      href={
                        media.media_type === "movie"
                          ? `/movie/${media.id}`
                          : `/tv/${media.id}`
                      }
                      className="text-white text-4xl md:text-5xl font-bold mb-4 hover:text-gray-400 transition-all duration-200"
                    >
                      {media.title || media.name}
                    </a>
                    {/* Media Genres */}
                    <div className="flex flex-wrap my-4">
                      {media.genre_ids.map((genreId) => {
                        const genre = genres.find(
                          (genre) => genre.id === genreId
                        );
                        return (
                          genre && (
                            <span
                              key={genreId}
                              className="rounded-full bg-transparent border px-2 py-1 text-sm md:text-base font-semibold text-white mr-2 mb-2 hover:bg-white hover:text-black hover:shadow-md transition-all duration-300 ease-in-out"
                            >
                              {genre.name}
                            </span>
                          )
                        );
                      })}
                    </div>
                    {/* Media Overview */}
                    <p className="text-white text-lg md:text-xl mt-2">
                      {media.overview}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSection;
