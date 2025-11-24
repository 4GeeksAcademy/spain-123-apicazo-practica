import React from "react";
import { Link } from "react-router-dom";
import starTropper from "../assets/img/startrooper.png";


export const Contacts = () => {
    const contact = {
        name: "Linus Torvalds",
        location: "Helsinki, Finlandia",
        phone: "+1 22 4654 9789",
        email: "linus@linux.org",
    };

    return (
        <div className="container bg-dark mb-3">
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
                    <div className="d-flex align-items-center p-3">
                        <div className="flex-shrink-0 me-3">
                            <img
                                src={starTropper}
                                alt={`Imagen de ${contact.name}`}
                                style={{ width: "90px", height: "60px" }}
                            />
                        </div>

                        <div className="flex-grow-1 text-dark">
                            <h5 className="card-title fw-bold mb-1">{contact.name}</h5>

                            <p className="card-text mb-0">
                                <i className="fa fa-location me-2"></i>
                                {contact.location}
                            </p>

                            <p className="card-text mb-0">
                                <i className="fa fa-phone me-2"></i>
                                {contact.phone}
                            </p>

                            <p className="card-text">
                                <i className="fa fa-envelope me-2"></i>
                                {contact.email}
                            </p>
                        </div>

                        <div className="ms-auto d-flex align-items-center">
                            <button className="btn btn-secondary me-2 p-2">
                                <i className="fa fa-pencil"></i>
                            </button>

                            <button className="btn btn-danger p-2">
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    );
};
