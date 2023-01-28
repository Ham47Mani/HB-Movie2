import axiosClient from "./axiosClient";

//------ Category
export const category = {
  movie: 'movie',
  tv: 'tv'
}

//------ Movie Tayps
export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated'
}

//------ Tv Types
export const tvType = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air'
}

//------ The Movie Database Api
const tmdbApi = {
  //--- Get Movie List
  getMoviesList: (type, params) => {
    const url = `movie/${movieType[type]}`;
    return axiosClient.get(url, params);
  },

  //--- Get Tv List
  getTvList: (type, params) => {
    const url = `tv/${tvType[type]}`;
    return axiosClient.get(url, params);
  },

  //--- Get Videos
  getVideos: (cat, id) => {
    const url = `${category[cat]}/${id}/videos`;
    return axiosClient.get(url, {params: {}});
  },

  //--- Search
  search: (cat, params) => {
    const url = `search/${category[cat]}`;
    return axiosClient.get(url, params);
  },

  //--- Details
  details: (id, cat, params) => {
    const url = `${category[cat]}/${id}`;
    return axiosClient.get(url, params);
  },

  //--- Credits
  credits: (id, cat) => {
    const url = `${category[cat]}/${id}/credits`;
    return axiosClient.get(url, {params: {}});
  },

  //--- Similar
  similar: (id, cat) => {
    const url = `${category[cat]}/${id}/similar`;
    return axiosClient.get(url, {params: {}});
  }
}


export default tmdbApi;