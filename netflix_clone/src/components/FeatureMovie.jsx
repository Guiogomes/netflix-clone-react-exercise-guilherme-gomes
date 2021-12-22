import React, { useContext } from 'react';
import '../css/FeatureMovie.css';
import MovieContext from '../Provider/MovieContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeatureMovie = () => {
	const { handleWatchClick, featuredData } = useContext(MovieContext)
	const firstDate = new Date(featuredData.first_air_date);
	let genres = [];
	for(let i in featuredData.genres) {
		genres.push(featuredData.genres[i].name)
	}
	let description = featuredData.overview
	if(description.length > 200) {
		description = `${description.substring(0, 200)}...`;
	}
	
	return(
		featuredData &&
		<section className="featured" style={
			{
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredData.backdrop_path})`
			}
		}>
			<div className="featured--vertical">
				<div className="featured--horizontal">
					<div className="featured--name">{featuredData.original_name}</div>
					<div className="featured--info">
						<div className="featured--average">{`${featuredData.vote_average} pontos`}</div>
						<div className="featured--release">{firstDate.getFullYear()}</div>
						<div className="featured--seasons">{featuredData.number_of_seasons} temporada{featuredData.number_of_seasons !== 1 ? 's' : ''}</div>
					</div>
					<div className="featured--description">{description}</div>
					<div className="featured--buttons">
						<button className="featured--watchbutton" onClick={() => handleWatchClick(featuredData.id) }
						>▶︁ Assistir</button> 
						<a className="featured--mylistbutton" href={`/list/add/${featuredData.id}`}>+︁ Minha Lista</a>
					</div>
					<div className="featured--genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
				</div>
			</div>
		</section>
	)
};

export default FeatureMovie; 