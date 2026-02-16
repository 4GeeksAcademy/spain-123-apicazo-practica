import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("Cargando...");
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        console.log("TOKEN (private):", token);

        if (!token) {
            navigate("/login");
            return;
        }

        const loadPrivate = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/private`;

                const resp = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const text = await resp.text();
                let data = {};
                try {
                    data = JSON.parse(text);
                } catch {
                    // Si el backend devolvió HTML u otra cosa
                    data = { msg: text };
                }

                if (!resp.ok) {
                    // Muy común: 422 Missing Authorization Header / token malformed
                    console.log("PRIVATE ERROR:", resp.status, data);

                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("user_id");

                    setError(data.msg || `Acceso denegado (${resp.status})`);
                    navigate("/login");
                    return;
                }

                setMessage(data.msg || "Acceso concedido");
            } catch (err) {
                console.log(err);
                setError("No se pudo conectar con el backend");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user_id");
                navigate("/login");
            }
        };

        loadPrivate();
    }, [navigate]);

    return (
        <div className="container mt-5 text-light">
            <h1>Private</h1>
            {error ? <div className="alert alert-danger">{error}</div> : <p>{message}</p>}
        </div>
    );
};
