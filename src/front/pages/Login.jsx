import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await resp.json();

        if (!resp.ok) {
            setError(data.msg || "Credenciales incorrectas");
            return;
        }

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user_id", data.user_id);

        alert("Has iniciado sesión");

        navigate("/characters");
    };

    return (
        <div className="container mt-5 text-light">
            <h1>Login</h1>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            <form className="mt-3" onSubmit={handleSubmit}>
                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="btn btn-primary">Entrar</button>
            </form>

            <p className="mt-3">
                ¿No tienes cuenta? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
};
