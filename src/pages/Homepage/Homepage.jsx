import React from 'react';
import Banner from './Components/Banner/Banner';
import PopularMovieSlide from './Components/PopularMovieSlide/PopularMovieSlide';
import UpcomingMovieSlide from './Components/UpcomingMovieSlider/UpcomingMovieSlider';
import TopRatedMovieSlide from './Components/TopRatedMovieSlide/TopRatedMovieSlide';

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMovieSlide />
    </div>
  )
}

export default Homepage
