import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import starTropper from "../assets/img/startrooper.png";

const baseURL = "https://playground.4geeks.com/contact";
const user = "AlexPicazo";

export const Contacts = () => {

    const [contact, setContact] = useState([]);
    const navigate = useNavigate();

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

    const getContacts = async () => {
        const uri = `${baseURL}/agendas/${user}/contacts`;

        const response = await fetch(uri);
        if (!response.ok) {
            console.log("error", response.status, response.statusText);
            if (response.status == "404") {
                console.log("Por favor crea la agenda", user);
                const created = await crearAgenda();
                if (created) {
                    return getContacts();
                }
            }

            return;
        }
        const data = await response.json();
        //logica de la aplicación
        setContact(data.contacts);

    };

    const handleDelete = async (param) => {
        const uri = `${baseURL}/agendas/${user}/contacts/${param}`;
        const options = {
            method: "DELETE",
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("error", response.status, response.statusText);

            return;
        }

        console.log("Usuario eliminado");
        getContacts();
    };

    useEffect(() => {
        getContacts();
    }, [])

    return (
        <div className="container-fluid bg-dark mb-3">
            <div className="navbar navbar-dark bg">
                <h1 className="text-light pt-4">Contacts</h1>
                <Link to="/add-contact">
                    <button className="btn btn-primary">Añadir contactos</button>
                </Link>
            </div>
            <ul>
                <div
                    className="card mb-3 bg-light border-0"
                    style={{ borderBottom: "4px solid #343a40" }}
                >
                    {
                        contact.map((item) =>

                            <div className="d-flex align-items-center p-3">
                                <div className="flex-shrink-0 me-3">
                                    <img
                                        src={starTropper}
                                        alt={`Imagen de ${item.name}`}
                                        style={{ width: "90px", height: "60px" }}
                                    />
                                </div>

                                <div className="flex-grow-1 text-dark">
                                    <h5 className="card-title fw-bold mb-1">{item.name}</h5>

                                    <p className="card-text mb-0">
                                        <i className="fa fa-location me-2"></i>
                                        {item.address}
                                    </p>

                                    <p className="card-text mb-0">
                                        <i className="fa fa-phone me-2"></i>
                                        {item.phone}
                                    </p>

                                    <p className="card-text">
                                        <i className="fa fa-envelope me-2"></i>
                                        {item.email}
                                    </p>
                                </div>

                                <div className="ms-auto d-flex align-items-center">

                                    <button
                                        className="btn btn-secondary me-2 p-2"
                                        onClick={() => navigate(`/contacts/${item.id}`)}
                                    >
                                        <i className="fa fa-pencil"></i>
                                    </button>



                                    <button className="btn btn-danger p-2" onClick={() => handleDelete(item.id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>


                        )}

                </div>
            </ul>
        </div>
    );
};
