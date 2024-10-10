import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import styled from "styled-components"
import Modal from "../components/Modal"
import Habit from "../components/Habit"
import { Link } from "react-router-dom"


export default function Habits({ token }) {
    const [habits, setHabits] = useState(null)
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const[habit, setHabit] = useState("")



    useEffect(() => {
        if (!token) {

            navigate("/")
            return
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
            .then((res) => {
                setHabits(res.data);
                //console.log(res.data)
            })
            .catch((error) => {
                console.error("Erro ao buscar hábitos:", error);
            });
    }, []);





    return (
        <Container>
            {token && <Header />}

            {!habits && <H1>Carregando...</H1>}
            {habits && (
                <ButtonContainer>
                    <H1>Meus hábitos</H1>
                    <div onClick={() => setShowModal(!showModal)} >
                        +
                    </div>


                </ButtonContainer>

            )}

            {showModal && <Modal habit={habit} setHabit={setHabit} setHabits={setHabits} token={token} showModal={showModal} setShowModal={setShowModal} />}
            {habits && habits.length == 0 && <Parag>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Parag>}

            {!showModal && (
                <HabitsContainer>
                    {habits && habits.map((habit) => (
                        <Habit key={habit.id} name={habit.name} days={habit.days} />
                    ))}
                </HabitsContainer>
            )}

            {!showModal && (
                <StyledFooter>


                    <FooterP1>
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9V11H4V9H6ZM10 9V11H8V9H10ZM14 9V11H12V9H14ZM16 2C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4V18C18 18.5304 17.7893 19.0391 17.4142 19.4142C17.0391 19.7893 16.5304 20 16 20H2C0.89 20 0 19.1 0 18V4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2H3V0H5V2H13V0H15V2H16ZM16 18V7H2V18H16ZM6 13V15H4V13H6ZM10 13V15H8V13H10ZM14 13V15H12V13H14Z" fill="white" />
                        </svg>
                        <p>Hábitos</p>
                    </FooterP1>

                    <FooterP2>
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 9.53C12.71 9.24 12.23 9.24 11.94 9.53L7.59 13.88L6 12.29C5.71 12 5.23 12 4.94 12.29C4.65 12.58 4.65 13.06 4.94 13.35L6.88 15.29C7.27 15.68 7.9 15.68 8.29 15.29L12.99 10.59C13.29 10.3 13.29 9.82 13 9.53ZM16 2H15V1C15 0.45 14.55 0 14 0C13.45 0 13 0.45 13 1V2H5V1C5 0.45 4.55 0 4 0C3.45 0 3 0.45 3 1V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM15 18H3C2.45 18 2 17.55 2 17V7H16V17C16 17.55 15.55 18 15 18Z" fill="#D4D4D4" />
                        </svg>

                        <LinkButton to={"/hoje"} >
                            Hoje
                        </LinkButton>
                    </FooterP2>
                </StyledFooter>
            )}

        </Container>
    );
}

const Container = styled.div`
    width: 375px;
    background-color: #dee7ee4b;
    height: 667px;
    position: relative;
   

`

const H1 = styled.h1`
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

const ButtonContainer = styled.div`
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

const HabitsContainer = styled.div`


    height: 472px;
    overflow-y: scroll;
    padding-bottom: 15px;
    overflow-x: hidden;
`


const StyledFooter = styled.div`

    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    bottom: 0%;


`

const FooterP1 = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
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


const FooterP2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
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

const LinkButton = styled(Link)`
    color: #D4D4D4;
    text-decoration: none;
`
