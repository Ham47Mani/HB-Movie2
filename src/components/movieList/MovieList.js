import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi from '../../api/tmdbApi';

import "./movie-list.scss";
import MovieCard from '../movie-card/MovieCard';

const MovieList = ({category, type, id }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getList = async () => {
      let response = null;
      const  params = {};

      if (type !== "similar") {
        switch (category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(type, {params});
            break;
          default :
            response = await tmdbApi.getTvList(type, {params});
        }
      } else {
        response = await tmdbApi.similar(id, category);
      }
      setItems(response.results);
    }

    //--- Call getList Func
    getList();
  }, [category, id, type]);

  return (
    <div className='movie-list'>
      <Swiper
        grabCursor= {true}
        spaceBetween= {10}
        slidesPerView= {'auto'}
      >
        {items.map(item => (
          <SwiperSlide key={item.id}>
            <MovieCard item={item} category={category}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default MovieList