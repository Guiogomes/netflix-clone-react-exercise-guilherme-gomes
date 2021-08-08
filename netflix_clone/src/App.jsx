import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import RequestApiTmdb from './components/RequestApiTmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';
import './App.css';
import Loading from './components/Loading';

export default function App () {

  const [ movieList, setMovieList ] = useState([]);
  const [ featuredData, setFeatureData ] = useState(null);
  const [ blackHeaderColor, setBlackHeaderColor ] = useState(false);
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
  
  useEffect(()=> {
    const scrollListener = () => {
      if(window.scrollY > 50) {
        setBlackHeaderColor(true);
      } else {
        setBlackHeaderColor(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  },[])

  return(
    <BrowserRouter>
      <div className="page">
        <Header blackColor={blackHeaderColor}/>
        {featuredData && 
        <FeatureMovie item={featuredData} />
      }
      
        <section className="lists">
          {movieList.map((item, key)=> (
            <MovieRow key={key} title={item.title} items={item.items}/>
            ))}
        </section>

        <footer>
          Feito com <span role="img" aria-label="coração">♥︁</span><br/>
          Dados pegos do site ThemovieDb.org <br/>
          Direitos de imagem da NetFlix <br/>
          Para assistir o vídeo tutorial utilizado acesse o link: <br/>
          <a className="featured--mylistbutton" href="https://www.youtube.com/watch?v=tBweoUiMsDg&t=7302s&ab_channel=BoniekyLacerda">Vídeo aula Bonieky Lacerda</a>
        </footer>
        { movieList.length <= 0 && <Loading /> }
      </div>
    </BrowserRouter>
  )
  
}
