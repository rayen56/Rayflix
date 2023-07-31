// src/pages/Home.js
import React from 'react';
import PopularMovies from '../components/movies/PopularMovies';
import PopularTv from '../components/tv/PopularTv';
import HeroSection from '../components/HeroSection';
import TrendingMovies from '../components/movies/TrendingMovies';
import TrendingTv from '../components/tv/TrendingTv';



const Home = () => {
  return (
    <div className='bg-indigo-100'>
      <HeroSection /> 
      <div className="max-w-6xl mx-auto ">
      <PopularMovies />
      <TrendingMovies />
      <PopularTv />
      <TrendingTv />
      </div>
      
    </div>
  );
};

export default Home;
