import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { category, movieType, tvType } from '../api/tmdbApi';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movieList/MovieList';

const Home = () => {
  return (
    <Fragment>
      <HeroSlide />
      <div className='container'>
        {/* -------------- Trending Movie -------------- */}
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular}/>
        </div>
        
        {/* -------------- Top Rated Movie -------------- */}
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated}/>
        </div>

        {/* -------------- Top Rated Movie -------------- */}
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Trending TV</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular}/>
        </div>

        {/* -------------- Top Rated TV -------------- */}
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Top Rated TV</h2>
            <Link to="/movie">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated}/>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
