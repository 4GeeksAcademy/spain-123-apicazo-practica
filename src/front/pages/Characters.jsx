import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Characters = () => {
    const swapiHost = "https://www.swapi.tech/api";
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleDetails = (personaje) => {
        dispatch({
            type: "characters_details",
            payload: personaje,
        });

        navigate("/charactersDetails");
    };

    const handleAddFavorite = (item) => {
        dispatch({
            type: "add_favorite",
            payload: {
                uid: item.uid,
                name: item.name,
                type: "character",
            },
        });
    };

    const getCharacters = async () => {

        let personajes = JSON.parse(localStorage.getItem("characters"));

        if (!personajes) {
            const uri = `${swapiHost}/people`;
            const response = await fetch(uri);

            if (!response.ok) {
                console.log("Error", response.status, response.statusText);
                return;
            }

            const data = await response.json();
            personajes = data.results;

            localStorage.setItem("characters", JSON.stringify(personajes));
        }

        setCharacters(personajes);
    };

    useEffect(() => {
        getCharacters();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center text-light mb-4">Characters</h1>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                {characters.map((item) => (
                    <div className="col" key={item.uid}>
                        <div className="card h-100">
                            <img
                                src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/people/${item.uid}.jpg?raw=true`}
                                className="card-img-top"
                                alt={item.name}
                            />

                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>

                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleDetails(item)}
                                    >
                                        Details
                                    </button>

                                    <button
                                        className="btn btn-outline-warning btn-sm"
                                        onClick={() => handleAddFavorite(item)}
                                        title="Añadir a favoritos"
                                    >
                                        <i className="fa-regular fa-heart"></i>
                                    </button>
                                </div>


                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
