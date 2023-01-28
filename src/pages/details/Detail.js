import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import tmdbApi from "../../api/tmdbApi";
import CastList from './CastList';
import MovieList from '../../components/movieList/MovieList';

//--- Import Style File
import "./details.scss";
import VideoList from './VideoList';

const Detail = () => {
  const {category, id} = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    //--- getDetails Function
    const getDetails = async () => {
      const response = await tmdbApi.details(id, category, {params : {}});
      setItem(response);
      window.scrollTo(0, 0);
    }

    //--- Call getDetails Function
    getDetails();
  }, [category, id]);

  return (
    <Fragment>
      {
        item && (
          <div 
            className='banner' 
            style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}
          >
            <div className='movie-content container mb-3'>
              <div className='movie-content__poster'>
                <div 
                  className='movie-content__poster__img'
                  style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}
                ></div>
              </div>
              <div className='movie-content__info'>
                <h1>{item.title || item.name}</h1>
                <div className='genres'>{
                  item.genres && item.genres.slice(0, 5).map((genre, i) => (
                    <span className='genres__item' key={i}>{genre.name}</span>
                  ))
                }</div>
                <p className='overview'>{item.overview}</p>
                <div className='cast'>
                  <div className='section__header'>
                    <h2>Casts</h2>
                  </div>
                  {/* -------- Cast List -------- */}
                  <CastList id={item.id}/>
                </div>
              </div>
            </div>
            <div className='container'>
              {/* ---------- Videos Section ---------- */}
              <div className='section mb-3'>
                <VideoList id={id} />
              </div>
              {/* ---------- Similair Section ---------- */}
              <div className='section mb-3'>
                <div className='section__header mb-2'>
                  <h2>Similair</h2>
                </div>
                <MovieList category={category} type="similar" id={item.id} />
              </div>
            </div>
          </div>
        )
      }
    </Fragment>
  );
}

export default Detail;
