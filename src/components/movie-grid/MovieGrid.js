import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi, { movieType, tvType } from '../../api/tmdbApi';
import Button, { OutlineButton } from '../button/Button';
import MovieCard from '../movie-card/MovieCard';
import Input from "../input/Input";

//--- Import Style Files
import "./movie-grid.scss";

// ======================== Start Movie Grid ========================
const MovieGrid = ({category}) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  const {keyword} = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (category) {
          case "movie" :
            response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, {params});
            break;
        }
      } else {
        const params = { query: keyword };
        response = await tmdbApi.search(category, {params});
      }
      setItems(response.results);
      setTotalPages(response.total_pages);
    }

    getList();
  },[category, keyword]);

  const loadMore = async () => {
    let response = null;
      if (keyword === undefined) {
        const params = {
          page: page + 1
        };
        switch (category) {
          case "movie" :
            response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, {params});
            break;
        }
      } else {
        const params = { 
          query: keyword,
          page: page + 1
        };
        response = await tmdbApi.search(category, {params});
      }
      setItems([...items, ...response.results]);
      setPage(page + 1);
  }

  return (
    <Fragment>
      <div className='section mb-3'>
        <MovieSearch category={category} keyword={keyword} />
      </div>
      <div className='movie-grid mb-3'>
        {
          items.map(item => <MovieCard key={item.id} category={category} item={item}/>)
        }
      </div>
      {
        page < totalPages ? (
          <div className='movie-grid__loadmore'>
            <OutlineButton className="small" onClick={loadMore} >Load More</OutlineButton>
          </div>
        ) : null
      }
    </Fragment>
  );
}
// ======================== End Movie Grid ========================

// ======================== Start Movie Search ========================
const MovieSearch = (props) => {

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  //--- goToSearch Function
  const goToSearch = useCallback(
    () => {
      if (keyword.trim().length > 0) {
        navigate(`search/${keyword}`) 
      }
    }, [keyword, navigate]
  );

  //--- UseEffect
  useEffect(() => {
    //--- enterEvente Function
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    }
    //--- Add Event Listener
    document.addEventListener('keyup', enterEvent);
    //--- Make return function to work as a ComponentDidUnmount
    return () => {
      //--- Remove EventListener
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className='movie-search'>
      <Input
        type= "text"
        placeholder="Enter Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch} >Search</Button>
    </div>
  )
}
// ======================== End Movie Search ========================

export default MovieGrid;
