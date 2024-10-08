import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header"
import styled from "styled-components";

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
                console.log(res.data)
                setHabits(res.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar hábitos:", error);
            });
    }, []); 

    

    return (
        <>
            {token && <Header/>  }
            {!habits ? <H1>carregando</H1> : <H1>Meus hábitos</H1>}
        </>
    );
}

const H1 = styled.h1 `
    font-family: "Lexend Deca";
    font-size: 22.98px;
    font-weight: 400;
    line-height: 28.72px;
    text-align: left;
    color: #126BA5;

`
