import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import styled from "styled-components";
import Modal from "../components/Modal";
import Habit from "../components/Habit";


export default function Habits({ token }) {
    const [habits, setHabits] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)



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
                console.log(res.data)
            })
            .catch((error) => {
                console.error("Erro ao buscar hábitos:", error);
            });
    }, []); 





    return (
        <Container>
            {token && <Header/>  }

            {!habits &&  <H1>carregando</H1>}
            { habits && (
                    <ButtonContainer>
                        <H1>Meus hábitos</H1>
                        <div onClick={()=> setShowModal(!showModal)} >
                            +
                        </div>
                        
                        
                    </ButtonContainer>
                    
                )}

            {showModal && <Modal setHabits={setHabits} token={token} showModal={showModal} setShowModal={setShowModal} />}
            {habits && habits.length == 0 && <Parag>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Parag>}
            
            {!showModal && (
                 <HabitsContainer>
                 {habits && habits.map((habit) => (
                     <Habit key={habit.id}  name={habit.name} days={habit.days} />
                 ))}
                 </HabitsContainer>
            )}  
           
            {!showModal && (
                <Footer>
                  <FooterP1>  Hábitos</FooterP1>
                  <FooterP2>  Hoje</FooterP2>
              </Footer>
            )}
          
        </Container>
    );
}

const Container = styled.div `
    width: 375px;
    background-color: #dee7ee4b;
    height: 667px;
    position: relative;
   

`

const H1 = styled.h1 `
    font-family: "Lexend Deca";
    font-size: 22.98px;
    font-weight: 400;
    line-height: 28.72px;
    text-align: left;
    color: #126BA5;
    padding-top: 25px;
    padding-left: 15px;
    width: 375px;
`

const ButtonContainer = styled.div `
    display: flex;
    width: 375px;
    
    div{
        width: 40px;
        height: 35px;
        border-radius: 4px;
        font-family: "Lexend Deca";
        background-color:  #52B6FF;
        color: white;
        font-size: 26.98px;
        font-weight: 400;
        line-height: 33.72px;
        text-align: center;
        margin-top: 25px;
        margin-right: 10px;
    }
`

const Parag = styled.p`
    font-family: "Lexend Deca";
    font-size: 17.98px;
    font-weight: 400;
    line-height: 22.47px;
    text-align: left;
    margin-top: 30px;
    margin-left: 15px;
    width: 85%;
`

const HabitsContainer = styled.div `


    height: 472px;
    overflow-y: scroll;
    padding-bottom: 15px;
    overflow-x: hidden;
`

const Footer = styled.div `

    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    bottom: 0%;


`


const FooterP1 = styled.p `
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 187.5px;
    height: 65px;
    background-color:  #52B6FF;
    color: white;
    font-family: "Lexend Deca";
    font-size: 17.98px;
    font-weight: 400;
    line-height: 22.47px;
    text-align: center;
`


const FooterP2 = styled.p `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 187.5px;
    height: 65px;
    background-color: white;
    color:  #D4D4D4;
    font-family: "Lexend Deca";
    font-size: 17.98px;
    font-weight: 400;
    line-height: 22.47px;
    text-align: center;
    

`
