import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Planets = () => {
    const swapiHost = "https://www.swapi.tech/api";
    const [planets, setPlanets] = useState([]);
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleDetails = (planet) => {
        dispatch({
            type: "planets_details", // 👈 añade este case en tu store si no existe
            payload: planet,
        });

        navigate("/planetsDetails"); // 👈 crea esta ruta si la vas a usar
    };

    const handleFavoriteToggle = (planet) => {
        const exists = (store.favorites ?? []).some(
            (f) => (f.uid ?? f.id) === planet.uid
        );

        dispatch({
            type: exists ? "remove_favorite" : "add_favorite",
            payload: exists
                ? planet.uid
                : {
                    uid: planet.uid,
                    name: planet.name,
                    type: "planet",
                },
        });
    };

    const getPlanets = async () => {
        let planetas = JSON.parse(localStorage.getItem("planets"));

        if (!planetas) {
            const uri = `${swapiHost}/planets`;
            const response = await fetch(uri);

            if (!response.ok) {
                console.log("Error", response.status, response.statusText);
                return;
            }

            const data = await response.json();
            planetas = data.results;

            localStorage.setItem("planets", JSON.stringify(planetas));
        }

        setPlanets(planetas);
    };

    useEffect(() => {
        getPlanets();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-light mb-4">Planets</h1>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                {planets.map((planet) => {
                    const isFavorite = (store.favorites ?? []).some(
                        (f) => (f.uid ?? f.id) === planet.uid
                    );

                    return (
                        <div className="col" key={planet.uid}>
                            <div className="card h-100">
                                <img
                                    src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/planets/${planet.uid}.jpg?raw=true`}
                                    className="card-img-top"
                                    alt={planet.name}
                                />

                                <div className="card-body">
                                    <h5 className="card-title">{planet.name}</h5>

                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleDetails(planet)}
                                        >
                                            Details
                                        </button>

                                        <button
                                            className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"
                                                }`}
                                            onClick={() => handleFavoriteToggle(planet)}
                                            title="Favorito"
                                        >
                                            <i
                                                className={`${isFavorite ? "fa-solid" : "fa-regular"
                                                    } fa-heart`}
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
