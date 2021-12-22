import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MovieContext from './Provider/MovieContext';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';
import MovieTrailer from './components/MovieTrailer';
import './App.css';
import Loading from './components/Loading';

export default function App () {
  const { movieList, featuredData } = useContext(MovieContext);
  const [blackHeaderColor, setBlackHeaderColor ] = useState(false);
  
  useEffect(()=> {
  const scrollListener = () => {
    if(window.scrollY > 20) {
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
        <FeatureMovie />} />
        <Route path='/watch/:id' component={ MovieTrailer } />
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
