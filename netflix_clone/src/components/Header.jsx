import React from 'react';
import '../css/Header.css';

export default ({ blackColor }) => {
	return(
		<header className={blackColor ? 'black--color' : ''}>
			<div className="header--logo">
				<a href="/">
					<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png" alt="logo Netflix" />
				</a>
			</div>
			<div className="header--user">
				<a href="/">
					<img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" alt="avatar do usuário" />
				</a>
			</div>
		</header>
	);
}