import MovieContext from './MovieContext';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import RequestApiTmdb from '../components/RequestApiTmdb';

const MoviesProvider = ({ children }) => {
	const history = useHistory();
	const [favorites, setFavorites] = useState([]);
  const [ movieList, setMovieList ] = useState([]);
  const [ featuredData, setFeatureData ] = useState(null);
  
  useEffect(() => {
    const loadAll = async () => {
      let list = await RequestApiTmdb.getHomeList();
      setMovieList(list);
      
      let originalsNetflix = list.filter(filmes => filmes.slug === 'originals');
      let randomChosenMovie = Math.floor(Math.random() * (originalsNetflix[0].items.results.length - 1));
      let chosenMovie = originalsNetflix[0].items.results[randomChosenMovie];
      let chosenInfo = await RequestApiTmdb.getMovieInfo(chosenMovie.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []); 
  


	const handleSaveFavorite = (item) => {
		setFavorites([...favorites, item])
	}
	const handleWatchClick = (id) => {
		history.push(`/watch/${id}`)
	}
	const contextValue = {
		handleWatchClick,
		handleSaveFavorite,
		favorites,
		movieList,
		featuredData,
		
	}
	  return (
    <MovieContext.Provider value={ contextValue }>
      {children}
    </MovieContext.Provider>
  );
};

export default MoviesProvider;