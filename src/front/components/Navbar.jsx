import React from 'react';  // 0.- Importamos React
import { Link, useNavigate } from 'react-router-dom';


export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid d-flex justify-content-between">
				<>
					<Link to={"/"}>
						<h3 className='text-warning'>STAR WARS</h3>
					</Link>
				</>

				<div className='collapse navbar-collapse' >
					<div className='navbar-nav ms-auto'>

						<li className="nav-item">
							<Link className=" text-light nav-link" to="/characters">Characters</Link>
						</li>
						<li className="nav-item">
							<Link className=" text-light nav-link" to="/planets">Planets</Link>
						</li>
						<li className="nav-item">
							<Link className=" text-light nav-link" to="/starships">Starships</Link>

						</li>
						<li className="nav-item">
							<Link className=" text-light nav-link" to="/contacts">Contacts</Link>
						</li>
						<li className="nav-item dropdown">
							<Link className="nav-link  text-light dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<button className=" text-light btn btn-secondary">Favoritos</button>
							</Link>
							<ul className="dropdown-menu">
								<li>Hola</li>
								<li>Hola</li>
							</ul>
						</li>
					</div>

				</div>

			</div>
		</nav>
	);
};