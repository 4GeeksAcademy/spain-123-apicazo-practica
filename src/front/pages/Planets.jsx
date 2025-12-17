
import { useEffect, useState } from "react";


export const Planets = () => {

    const swapiHost = "https://www.swapi.tech/api";
    const [planets, setPlanets] = useState([]);

    const handleDetails = () => {

    }


    const getPlanets = async () => {
        const planetas = JSON.parse(localStorage.getiter('planets'))
        if (!planetas) {
            const uri = `${swapiHost}/planets`
            const response = await fetch(uri)
            if (!response.ok) {
                //tratamos el error
                console.log('Error', response.status, response.statusText)
                return;

            }
            const data = await response.json();
            localStorage.setiter('planets', JSON.stringify(data.results))
            planetas = data.results

        }
        setPlanets(planetas)

    }

    useEffect(() => {
        getPlanets();
    }, [])

    return (
        <div className="container mt-5">

            <h1 className="text-center text-light mb-4">Planets</h1>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">



                {planets.map((iter) =>
                    <div className="col">
                        <div className="card h-100">
                            <img
                                src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/planets/${item.uid}.jpg?raw=true`}
                                className="card-img-top"
                                alt="Character"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{iter.name}</h5>
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