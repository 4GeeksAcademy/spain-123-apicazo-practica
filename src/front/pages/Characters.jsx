
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Characters = () => {

    const swapiHost = "https://www.swapi.tech/api";
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleDetails = (personaje) => {
        //grabo el personaje en el store
        dispatch({
            type: 'characters_Details',
            payload: personaje
        })
        //navego al componente
        navigate("/charactersDetails");
    }

    const getCharacters = async () => {
        const personajes = JSON.parse(localStorage.getItem('characters'))
        if (!personajes) {
            const uri = `${swapiHost}/people`
            const response = await fetch(uri)
            if (!response.ok) {
                //tratamos el error
                console.log('Error', response.status, response.statusText)
                return;

            }
            const data = await response.json();
            localStorage.setItem('characters', JSON.stringify(data.results))
            personajes = data.results

        }
        setCharacters(personajes)

    }

    useEffect(() => {
        getCharacters();
    }, [])

    return (
        <div className="container mt-5">

            <h1 className="text-center text-light mb-4">Characters</h1>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">



                {characters.map((item) =>
                    <div className="col">
                        <div className="card h-100">
                            <img
                                src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/people/${item.uid}.jpg?raw=true`}
                                className="card-img-top"
                                alt="Character"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="d-flex justify-content-between">

                                    <button className="btn btn-primary btn-sm" onClick={handleDetails}>Details</button>
                                    <button className="btn btn-outline-warning btn-sm">
                                        <i className="fa-regular fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}