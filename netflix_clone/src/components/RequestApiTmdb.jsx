import React from 'react';

const API_KEY = '5efb28b5e02180c820f8772d1cd658c9';
const API_BASE = 'https://api.themoviedb.org/3';

// ORIGINAIS NETFLIX
// RECOMENDADOS (TRANDING)
// EM ALTA (TOP RATED)
// ACTION MOVIES
// COMEDY
// TERROR  
// DOCUMENTARY

const fetchedMovies = async (endpoint) => {
	const request = await fetch(`${API_BASE}${endpoint}`);
	const response = await request.json();
	return response;
}



export default {
	getHomeList: async () => {
		return [
			{
				slug: 'originals',
				title: 'Originais do Netflix',
				items: await fetchedMovies(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
			},
			{
				slug: 'trending',
				title: 'Recomendados para você',
				items: await fetchedMovies(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
			},
			{
				slug: 'toprated',
				title: 'Em Alta',
				items: await fetchedMovies(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
			},
			{
				slug: 'action-movies',
				title: 'Ação',
				items: await fetchedMovies(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
			},
			{
				slug: 'comedy-movies',
				title: 'Comédia',
				items: await fetchedMovies(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
			},
			{
				slug: 'horror-movies',
				title: 'Terror',
				items: await fetchedMovies(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
			},
			{
				slug: 'romance-movies',
				title: 'Romance',
				items: await fetchedMovies(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
			},
			{
				slug: 'documentary-movies',
				title: 'Documentário',
				items: await fetchedMovies(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
			},
		]
	},
	getMovieInfo: async (movieId, type) => {
		let info = {};
		switch(type) {
			case 'movie': 
				info = await fetchedMovies(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
			break;
			case 'tv':
				info = await fetchedMovies(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
			break;
			default:
				info = null;
				break;
		}
		return info;
	}
}