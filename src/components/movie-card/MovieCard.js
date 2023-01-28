import React from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import Button from '../button/Button';

//--- Style
import "./movie-card.scss";

const MovieCard = ({item, category}) => {
  const movie = item;
  const link = "/" + category + "/" + movie.id;
  const bg = apiConfig.w300Image(movie.poster_path || movie.backdrop_path);
  
  return (
    <Link to={link}>
      <div className='movie-card' style={{backgroundImage: `url(${bg})`}}>
        <Button>
          <i className='bx bx-play'></i>
        </Button>
      </div>
      <h3>{movie.title || movie.name}</h3>
    </Link>
  );
}

export default MovieCard;