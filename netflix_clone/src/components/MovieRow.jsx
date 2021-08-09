import React, { useState } from 'react';
import '../css/MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({title, items}) => {
	const [scrollX, setScrollX] = useState(-400);

	const handleLeftArrowClick = () => {
		let scrollValue = scrollX + Math.round(window.innerWidth / 2);
		if(scrollValue > 0) {
			scrollValue = 0;
		}
		setScrollX(scrollValue);
	}

	const handleRightArrowClick = () => {
		let scrollValue = scrollX - Math.round(window.innerWidth / 2);
		let maxWidthList = items.results.length * 150;
		if((window.innerWidth - maxWidthList) > scrollValue) {
			scrollValue = (window.innerWidth - maxWidthList) - 60;
		}
		setScrollX(scrollValue);
	}

	return (
		<div className="movieRow">
			<h2>{title}</h2>
			<div className="movieRow--left" onClick={handleLeftArrowClick}>
				<NavigateBeforeIcon style={ { fontSize: 50 } } />
			</div>
			<div className="movieRow--right" onClick={handleRightArrowClick}>
				<NavigateNextIcon style={ { fontSize: 50 } } />
			</div>
			<div className="movieRow--listarea">
				<div className="movieRow--list" style={{
					marginLeft: scrollX,
					width: items.results.length * 150,
				}}>
				{items.results.length > 0 && items.results.map((item, key) => (
					<div key={key} className="movieRow--item">
						<img alt={item.original_title} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
					</div>	
				))}
				</div>
			</div>
		</div>
	)
}