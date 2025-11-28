import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const CharactersDetails = () => {
    const { store } = useGlobalReducer();
    const [personajesDetails, setPersonajesDetails] = useState({});

    const getCharactersDetails = async () => {
        const response = await fetch(store.currentCharacter.url)
        if (!response.ok) {
            console.log('Error', response.status, response.type);
            return
        }
        const data = await response.json();
        console.log(data.result.properties);
        setPersonajesDetails(data.restults.properties)

    }

    useEffect(() => {
        getCharactersDetails();
    }, [])

    return (
        <div>
            <h1 className="text-light">Hola perro</h1>

        </div>
    )

}