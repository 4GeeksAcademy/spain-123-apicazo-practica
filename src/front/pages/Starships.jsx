import { useEffect, useState } from "react";


export const Starships = () => {

    const swapiHost = "https://www.swapi.tech/api";
    const [starships, setstarships] = useState([]);

    const handleDetails = () => {

    }


    const getstarships = async () => {
        const naves = JSON.parse(localStorage.getItem('starships'))
        if (!naves) {
            const uri = `${swapiHost}/starships`
            const response = await fetch(uri)
            if (!response.ok) {
                //tratamos el error
                console.log('Error', response.status, response.statusText)
                return;

            }
            const data = await response.json();
            localStorage.setItem('starships', JSON.stringify(data.results))
            naves = data.results

        }
        setstarships(naves)

    }

    useEffect(() => {
        getstarships();
    }, [])

    return (
        <div className="container mt-5">

            <h1 className="text-center text-light mb-4">starships</h1>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">



                {starships.map((item) =>
                    <div className="col">
                        <div className="card h-100">
                            <img
                                src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/starships/${item.uid}.jpg?raw=true`}
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