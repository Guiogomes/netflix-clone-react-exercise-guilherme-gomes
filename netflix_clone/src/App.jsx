import React, { useEffect, useState } from 'react';
import RequestApiTmdb from './components/RequestApiTmdb';

export default function App () {

  const [ movieList, setMovieList ] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      let list = await RequestApiTmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []); 
  
  return(
    <div>
      Olá Mundo!
    </div>
  )
  
}
