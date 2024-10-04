import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header"


export default function Habits({ token }) {
    const [habits, setHabits] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
            return; 
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
            .then((res) => {
                setHabits(res.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar hábitos:", error);
            });
    }, []); 

    return (
        <>
            <Header/>
            {!habits ? <h1>carregando</h1> : <h1>Carregou</h1>}
        </>
    );
}
