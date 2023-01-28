import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { category as cat } from '../api/tmdbApi';
import PageHeader from '../components/page-header/PageHeader';

//--- Import Style Files
import "../components/page-header/page-header.scss";
import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {
  const {category} = useParams();
  
  return (
    <Fragment>
      <PageHeader>
        {category === cat.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <div className='container'>
        <section className='mb-3'>
          <MovieGrid category={category}/>
        </section>
      </div>
    </Fragment>
  );
}

export default Catalog;
