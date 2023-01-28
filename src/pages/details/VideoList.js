import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';


// =============================== Start VideoList Component ===============================
const VideoList = ({id}) => {
  const {category} = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    //--- getCredits Function
    const getVideos = async () => {
      const response = await tmdbApi.getVideos(category, id);
      setVideos(response.results.slice(0, 5));
    }
    //--- Call getCredits Function
    getVideos();
  }, [id, category]);

  return (
    <Fragment>
      {
        videos.map((video, i) => (
          <Video item={video} key={i}/>
        ))
      }
    </Fragment>
  );
}
// =============================== End VideoList Component ===============================

// =============================== Start Video Component ===============================
const Video = ({item}) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = iframeRef.current.offsetWidth * 9/16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className='video'>
      <div className='video__title'>
        <h2>{item.name}</h2>
      </div>
      <iframe 
        src={`https://www.youtube.com/embed/${item.key}`} 
        ref={iframeRef} 
        width="100%"
        title={`video ${item.name}`}
      ></iframe>
    </div>
  );
}
// =============================== End Video Component ===============================

export default VideoList;
