import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from '../modal/Modal';

import SwiperCore, {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

//--- Import Api Config & Method
import tmdbApi,  {category, movieType} from "../../api/tmdbApi";
import apiConfig from '../../api/apiConfig';

//--- Import Style File
import "./hero-slide.scss";


// ------------------------------------- Start HeroSlide -------------------------------------
const HeroSlide = () => {
  //--- Initialize Swiper
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    //--- Function Fof 4 GetMovies
    const getMovies = async () => {
      const params = {page: 1}
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {params});
        setMovieItems(response.results.slice(0,4)); // (1,4)
      } catch (error) {
        console.log("error: " + error);
      }
    }
    //--- Cal getMovies Function
    getMovies();
  },[]);

  return (
    <div className='hero-slide'>
      <Swiper 
        className='hero-slide__swiper'
        module={[Autoplay]}
        grabCursor={true} 
        spaceBetween={0} 
        slidesPerView={1}
        loop={true}
        // autoplay={{delay: 3000}} 
      >
        {
          movieItems.map((item, i) => (
            <SwiperSlide key={i}>
              {({isActive}) => (
                <HeroSlideItem className={isActive ? "active" : ""} item={item}/>
              )}
            </SwiperSlide>
          ))
        }
      </Swiper>
      {movieItems ? movieItems.map((item, i) => <TrailerModal key={i} item={item} />) : ""}
    </div>
  );
}
// ------------------------------------- End HeroSlide -------------------------------------

// ------------------------------------- Start Hero Slide Item -------------------------------------
const HeroSlideItem = props => {
  let history = useNavigate();
  
  const item = props.item;
  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  //--- Active The Modal
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal__${item.id}`);
    const video = await tmdbApi.getVideos(category.movie, item.id);
    
    if (video.results.length > 0) {
      const videoSrc = 'https://www.youtube.com/embed/' + video.results[0].key;
      modal.querySelector('.modal__content > iframe').setAttribute("src", videoSrc);
    } else {
      modal.querySelector('.modal__content > iframe').innerHTML = "No Trailler";
    }
    modal.classList.toggle("active");
  }

  return (
    <div 
      className={`hero-slide__item ${props.className}`}
      style={{backgroundImage: `url(${background})`}}
    >
      <div className='hero-slide__item__content container'>
        <div className='hero-slide__item__content__info'>
          <h2 className='title'>{item.title}</h2>
          <div className='overview'>{item.overview}</div>
          <div className='btns'>
            <Button className="mb-1" onClick={() => history('/movie/' + item.id) }>Watch Now</Button>
            <OutlineButton className="mb-1" onClick={setModalActive} >Watch Trailer</OutlineButton>
          </div>
        </div>
        <div className='hero-slide__item__content__poster'>
          <img src={apiConfig.w300Image(item.poster_path)} alt={`${item.title} Post`}/>
        </div>
      </div>
      {item.title}
    </div>
  )
}
// ------------------------------------- End Hero Slide Item -------------------------------------

// ------------------------------------- Start Trailer Modal -------------------------------------
const TrailerModal = props => {
  const item = props.item;
  const iframRef = useRef(null);
  const onClose = () => iframRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal__${item.id}`} onClose={onClose}>
      <ModalContent onClose={onClose}>
        <iframe src='' ref={iframRef} width="100%" height="500px" title='Trailer'></iframe>
      </ModalContent>
    </Modal>
  );
}
// ------------------------------------- End Trailer Modal -------------------------------------

export default HeroSlide;
