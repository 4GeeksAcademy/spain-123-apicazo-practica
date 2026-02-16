import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const StarshipsDetails = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    const [shipDetails, setShipDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const current = store.currentStarship;

    const imgUrl = useMemo(() => {
        const uid = current?.uid || current?.id;
        if (!uid) return null;
        return `https://github.com/breatheco-de/swapi-images/blob/master/public/images/starships/${uid}.jpg?raw=true`;
    }, [current]);

    const getShipDetails = async () => {
        try {
            if (!current?.url) {
                setLoading(false);
                return;
            }

            const response = await fetch(current.url);
            if (!response.ok) {
                console.log("Error", response.status);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setShipDetails(data.result.properties);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        getShipDetails();
    }, []);

    if (!current?.url && !loading) {
        return (
            <div className="container mt-5 text-light">
                <h2>No hay nave seleccionada</h2>
                <Link to="/starships" className="btn btn-primary">
                    Volver a Starships
                </Link>
            </div>
        );
    }

    if (loading) return <div className="container mt-5 text-light">Cargando...</div>;

    if (!shipDetails)
        return <div className="container mt-5 text-light">Error cargando detalles</div>;

    return (
        <div className="container mt-5 text-light">
            <div className="row g-4">
                <div className="col-md-5">
                    <div className="card bg-dark border-secondary">

                        <img
                            src={imgUrl}
                            className="card-img-top"
                            alt={shipDetails.name}
                            onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                            }}
                        />

                        <div
                            className="text-warning fw-bold text-center"
                            style={{
                                display: "none",
                                minHeight: "400px",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.8rem"
                            }}
                        >
                            IMAGEN PERDIDA POR EL ESPACIO
                        </div>

                    </div>
                </div>


                <div className="col-md-7">
                    <h1 className="text-warning">{shipDetails.name}</h1>

                    <div className="card bg-dark border-secondary mt-3">
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-dark text-light">
                                    <strong>Model:</strong> {shipDetails.model}
                                </li>
                                <li className="list-group-item bg-dark text-light">
                                    <strong>Manufacturer:</strong> {shipDetails.manufacturer}
                                </li>
                                <li className="list-group-item bg-dark text-light">
                                    <strong>Cost:</strong> {shipDetails.cost_in_credits}
                                </li>
                                <li className="list-group-item bg-dark text-light">
                                    <strong>Length:</strong> {shipDetails.length}
                                </li>
                                <li className="list-group-item bg-dark text-light">
                                    <strong>Crew:</strong> {shipDetails.crew}
                                </li>
                                <li className="list-group-item bg-dark text-light">
                                    <strong>Passengers:</strong> {shipDetails.passengers}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-3">
                        <Link to="/starships" className="btn btn-primary">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
