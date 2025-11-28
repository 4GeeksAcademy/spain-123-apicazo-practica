import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const baseURL = "https://playground.4geeks.com/contact";
const user = "AlexPicazo";

export const EditContact = () => {

    //useParams coge las variables de la url que pueden alterarse (en este caso el ID)
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const getContactById = async () => {
        const uri = `${baseURL}/agendas/${user}/contacts`;

        const response = await fetch(uri);

        if (!response.ok) {
            console.log("error", response.status, response.statusText);
            return;
        }

        const data = await response.json();

        //Creamos la variable encontrado y nos aseguramos que el id de la URL coincide con el contacto que queremos editar

        const encontrado = data.contacts.find(contact => contact.id == id);

        if (!encontrado) {
            console.log("No existe el contacto con id:", id);
            return;
        }
        setName(encontrado.name);
        setEmail(encontrado.email);
        setPhone(encontrado.phone);
        setAddress(encontrado.address);


    };


    useEffect(() => {
        getContactById();
    }, []);


    const editarContacto = async (event) => {
        event.preventDefault();

        const uri = `${baseURL}/agendas/${user}/contacts/${id}`;

        const body = {
            name: name,
            email: email,
            phone: phone,
            address: address,
        };

        const response = await fetch(uri, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.log("Error al actualizar", response.status);
            return;
        }

        navigate("/contacts");
    };

    return (
        <div className="container bg-dark py-5">
            <h1 className="text-white mb-4">Editar Contacto</h1>

            <form onSubmit={editarContacto} className="text-white">
                <div className="mb-3">
                    <label className="form-label">Nombre completo *</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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

                <button type="submit" className="btn btn-warning me-2 px-4">
                    Guardar
                </button>

                <Link to="/contacts">
                    <button type="button" className="btn btn-secondary px-4">
                        Cancelar
                    </button>
                </Link>
            </form>
        </div>
    );
};
