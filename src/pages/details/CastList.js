import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';

const CastList = ({id}) => {
  const {category} = useParams();
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    //--- getCredits Function
    const getCredits = async () => {
      const response = await tmdbApi.credits(id, category);
      setCasts(response.cast.slice(0, 5));
    }
    //--- Call getCredits Function
    getCredits();
  }, [id, category]);

  return (
    <div className='casts'>
      {casts.map((item, i) => (
        <div className='casts__item' key={i}>
          <div 
            className='casts__item__img'
            style={{backgroundImage: `url(${apiConfig.w300Image(item.profile_path)})`}}
          ></div>
          <p className='casts__item__name'>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default CastList;
