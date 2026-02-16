import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Starships = () => {
    const swapiHost = "https://www.swapi.tech/api";
    const [starships, setStarships] = useState([]);
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleDetails = (ship) => {
        dispatch({
            type: "starship_details", // 👈 añadir en store
            payload: ship,
        });

        navigate("/starshipsDetails");
    };

    const handleFavoriteToggle = (ship) => {
        const exists = (store.favorites ?? []).some(
            (f) => (f.uid ?? f.id) === ship.uid
        );

        dispatch({
            type: exists ? "remove_favorite" : "add_favorite",
            payload: exists
                ? ship.uid
                : {
                    uid: ship.uid,
                    name: ship.name,
                    type: "starship",
                },
        });
    };

    const getStarships = async () => {
        let naves = JSON.parse(localStorage.getItem("starships"));

        if (!naves) {
            const uri = `${swapiHost}/starships`;
            const response = await fetch(uri);

            if (!response.ok) {
                console.log("Error", response.status, response.statusText);
                return;
            }

            const data = await response.json();
            naves = data.results;

            localStorage.setItem("starships", JSON.stringify(naves));
        }

        setStarships(naves);
    };

    useEffect(() => {
        getStarships();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-light mb-4">Starships</h1>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                {starships.map((ship) => {
                    const isFavorite = (store.favorites ?? []).some(
                        (f) => (f.uid ?? f.id) === ship.uid
                    );

                    return (
                        <div className="col" key={ship.uid}>
                            <div className="card h-100">
                                <img
                                    src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/starships/${ship.uid}.jpg?raw=true`}
                                    className="card-img-top"
                                    alt={ship.name}
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display = "flex";
                                    }}
                                />

                                <div
                                    className="text-warning fw-bold text-center p-3"
                                    style={{ display: "none", minHeight: "200px", alignItems: "center", justifyContent: "center" }}
                                >
                                    IMAGEN PERDIDA POR EL ESPACIO
                                </div>


                                <div className="card-body">
                                    <h5 className="card-title">{ship.name}</h5>

                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleDetails(ship)}
                                        >
                                            Details
                                        </button>

                                        <button
                                            className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"
                                                }`}
                                            onClick={() => handleFavoriteToggle(ship)}
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
