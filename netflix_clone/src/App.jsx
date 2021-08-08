import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import RequestApiTmdb from './components/RequestApiTmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import './App.css';

export default function App () {

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
  
  return(
    <BrowserRouter>
      <div className="page">
        
        {featuredData && 
        <FeatureMovie item={featuredData} />
      }
        
        <section className="lists">
          {movieList.map((item, key)=> (
            <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
        </section>
      </div>
    </BrowserRouter>
  )
  
}
