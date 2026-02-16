import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const favorites = store.favorites ?? [];
	const navigate = useNavigate();

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_id");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid d-flex justify-content-between">
				<Link to="/" className="text-decoration-none">
					<h3 className="text-warning m-0">STAR WARS</h3>
				</Link>

				<div className="collapse navbar-collapse">
					<ul className="navbar-nav ms-auto align-items-lg-center">
						<li className="nav-item">
							<Link className="text-light nav-link" to="/characters">
								Characters
							</Link>
						</li>

						<li className="nav-item">
							<Link className="text-light nav-link" to="/planets">
								Planets
							</Link>
						</li>

						<li className="nav-item">
							<Link className="text-light nav-link" to="/starships">
								Starships
							</Link>
						</li>

						<li className="nav-item">
							<Link className="text-light nav-link" to="/contacts">
								Contacts
							</Link>
						</li>

						<li className="nav-item dropdown">
							<button
								className="btn btn-secondary dropdown-toggle"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Favoritos ({favorites.length})
							</button>

							<ul className="dropdown-menu dropdown-menu-end">
								{favorites.length === 0 ? (
									<li>
										<span className="dropdown-item text-muted">
											No hay favoritos
										</span>
									</li>
								) : (
									favorites.map((fav, index) => (
										<li
											key={fav.uid ?? fav.id ?? index}
											className="dropdown-item d-flex justify-content-between align-items-center"
										>
											<span className="me-2">{fav.name}</span>

											<button
												className="btn btn-sm btn-outline-danger"
												onClick={() =>
													dispatch({
														type: "remove_favorite",
														payload: fav.uid ?? fav.id,
													})
												}
												title="Eliminar de favoritos"
											>
												✕
											</button>
										</li>
									))
								)}
							</ul>
						</li>
						<button className="btn btn-outline-light ms-3" onClick={handleLogout}>
							Logout
						</button>

					</ul>
				</div>
			</div>
		</nav>
	);
};
