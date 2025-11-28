import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";


export const AddContact = () => {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();


    const baseURL = "https://playground.4geeks.com/contact";
    const user = "AlexPicazo";

    const crearAgenda = async () => {

        const uri = `${baseURL}/agendas/${user}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ agenda_slug: user }),
        };

        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Error creando la agenda:", response.status, response.statusText);
            return false;
        }

        console.log("Agenda creada");
        return true;
    };

    const handleSubmitContact = async (event) => {
        event.preventDefault();

        const dataToSend = {
            name,
            email,
            phone,
            address
        };

        const uri = `${baseURL}/agendas/${user}/contacts`;

        const options = {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(uri, options);

        if (!response.ok) {
            console.log("error", response.status, response.statusText);
            const creada = await crearAgenda;
            if (creada) {
                return handleSubmitContact();
            } else {

                console.log("La agenda no existe");
                crearAgenda();
                console.log("La agenda ha sido creada");

                handleSubmitContact();
            }

        }

        const data = await response.json();
        console.log(data);

        setname("");
        setEmail("");
        setPhone("");
        setAddress("");

        navigate("/contacts")
    };

    return (
        <div className="container bg-dark py-5">
            <h1 className="text-white mb-4">Añadir Contacto</h1>

            <form className="text-white">
                <div className="mb-3">
                    <label className="form-label">Nombre completo *</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Correo electrónico *</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Móvil *</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Address *</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>



                <button type="submit" className="btn btn-warning me-2 px-4" onClick={(handleSubmitContact)}>Guardar</button>

                <Link to="/contacts">
                    <button type="button" className="btn btn-secondary px-4" onClick={() => { navigate(`/contacts`) }}>Cancelar</button>
                </Link>
            </form>
        </div>
    );
}
