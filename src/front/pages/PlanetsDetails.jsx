import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const PlanetsDetails = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    const [planetDetails, setPlanetDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const current = store.currentPlanet;

    const imgUrl = useMemo(() => {
        const uid = current?.uid || current?.id;
        if (!uid) return null;
        return `https://github.com/breatheco-de/swapi-images/blob/master/public/images/planets/${uid}.jpg?raw=true`;
    }, [current]);

    const getPlanetDetails = async () => {
        try {
            if (!current?.url) {
                setLoading(false);
                return;
            }

            const response = await fetch(current.url);
            if (!response.ok) {
                console.log("Error", response.status, response.statusText);
                setLoading(false);
                return;
            }

            const data = await response.json();
            setPlanetDetails(data.result.properties);
            setLoading(false);
        } catch (err) {
            console.log("Fetch error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        getPlanetDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Entrar por URL directa / refresh sin seleccionar planeta antes
    if (!current?.url && !loading) {
        return (
            <div className="container mt-5 text-light">
                <h2>No hay planeta seleccionado</h2>
                <p>Vuelve a la lista y pulsa “Details” en un planeta.</p>
                <Link to="/planets" className="btn btn-primary">
                    Volver a Planets
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container mt-5 text-light">
                <h2>Cargando...</h2>
            </div>
        );
    }

    if (!planetDetails) {
        return (
            <div className="container mt-5 text-light">
                <h2>No se pudieron cargar los detalles</h2>
                <button className="btn btn-primary" onClick={() => navigate("/planets")}>
                    Volver a Planets
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5 text-light">
            <div className="row g-4 align-items-start">
                {/* Imagen grande */}
                <div className="col-12 col-md-5">
                    <div className="card bg-dark border-secondary">
                        {imgUrl ? (
                            <img
                                src={imgUrl}
                                className="card-img-top"
                                alt={planetDetails.name}
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <div className="p-4 text-muted">Sin imagen</div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="col-12 col-md-7">
                    <h1 className="text-warning">{planetDetails.name}</h1>

                    <div className="card bg-dark border-secondary mt-3">
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item bg-dark text-light border-secondary">
                                    <strong>Climate:</strong> {planetDetails.climate}
                                </li>
                                <li className="list-group-item bg-dark text-light border-secondary">
                                    <strong>Terrain:</strong> {planetDetails.terrain}
                                </li>
                                <li className="list-group-item bg-dark text-light border-secondary">
                                    <strong>Population:</strong> {planetDetails.population}
                                </li>
                                <li className="list-group-item bg-dark text-light border-secondary">
                                    <strong>Gravity:</strong> {planetDetails.gravity}
                                </li>
                                <li className="list-group-item bg-dark text-light border-secondary">
                                    <strong>Diameter:</strong> {planetDetails.diameter}
                                </li>
                                <li className="list-group-item bg-dark text-light border-secondary">
                                    <strong>Rotation period:</strong> {planetDetails.rotation_period}
                                </li>
                                <li className="list-group-item bg-dark text-light border-secondary">
                                    <strong>Orbital period:</strong> {planetDetails.orbital_period}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-3">
                        <Link to="/planets" className="btn btn-primary">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
