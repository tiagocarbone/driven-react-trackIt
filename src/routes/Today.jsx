
import { useEffect, useState } from "react";
import styled from "styled-components"
import Header from "../components/Header";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import axios from "axios";
import TodayHabit from "../components/TodayHabit";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Today({ token, setToken }) {

    const [loading, setLoading] = useState(false)
    const [habits, setHabits] = useState(null)
    const navigate = useNavigate();

    dayjs.locale('pt-br')
    //console.log(dayjs('2019-01-25').format('dddd/MM/YYYY'))
    //console.log(dayjs().format('dddd, DD/MM'))

    useEffect(() => {
        if (!token) {

            navigate("/");
            return;
        }
    })

    useEffect(() => {
       

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };


        setLoading(true)
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)
            .then((response) => {
                //console.log(response.data)
                setHabits(response.data)
                setLoading(false)
            })
            .catch((response) => {
                console.log(response)
            })



    }, []);

    //console.log("habits", habits)

    return (
        <Container>
            {token && <Header setToken={setToken}  />}
            {loading ? <StyledH1>Carregando... </StyledH1> : <StyledH1>{dayjs().format('dddd, DD/MM')}</StyledH1>}

            <HabitsContainer>
                {habits && habits.map((habit) => (
                    <TodayHabit key={habit.id} 
                    name={habit.name} 
                    currentSequence={habit.currentSequence}
                    highestSequence={habit.highestSequence}
                    done={habit.done}
                    habitId={habit.id}
                    token={token}
                    setHabits={setHabits}
                    />
                    
                ))}
            </HabitsContainer>

            <StyledFooter>


                <FooterP1>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 10V12H7V10H9ZM13 10V12H11V10H13ZM17 10V12H15V10H17ZM19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C3.89 21 3 20.1 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H6V1H8V3H16V1H18V3H19ZM19 19V8H5V19H19ZM9 14V16H7V14H9ZM13 14V16H11V14H13ZM17 14V16H15V14H17Z" fill="#D4D4D4"/>
                </svg>

                    <LinkButton to={"/habitos"} >
                        Hábitos
                    </LinkButton>
                </FooterP1>

                <FooterP2>
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 9.53C12.71 9.24 12.23 9.24 11.94 9.53L7.59 13.88L6 12.29C5.71 12 5.23 12 4.94 12.29C4.65 12.58 4.65 13.06 4.94 13.35L6.88 15.29C7.27 15.68 7.9 15.68 8.29 15.29L12.99 10.59C13.29 10.3 13.29 9.82 13 9.53ZM16 2H15V1C15 0.45 14.55 0 14 0C13.45 0 13 0.45 13 1V2H5V1C5 0.45 4.55 0 4 0C3.45 0 3 0.45 3 1V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM15 18H3C2.45 18 2 17.55 2 17V7H16V17C16 17.55 15.55 18 15 18Z" fill="white"/>
                </svg>


                    
                    <p>Hoje</p>
                </FooterP2>
            </StyledFooter>

        </Container>

    )

}

const StyledH1 = styled.h1`
    font-family: Lexend Deca;
    font-size: 22.98px;
    font-weight: 400;
    line-height: 28.72px;;
    color: #126BA5;
    padding-left: 10px;
    padding-top: 15px;

`

const Container = styled.div`
    background-color: #dee7ee4b;
    height: 667px;
    width: 375px;
    position: relative;

`

const HabitsContainer = styled.div`
    margin-top: 20px;
    height: 426px;
    overflow-y: scroll;
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
    background-color:  white;
    color: #D4D4D4;
    font-family: "Lexend Deca";
    font-size: 17.98px;
    font-weight: 400;
    line-height: 22.47px;
    text-align: center;

    svg{
        fill:  #D4D4D4;
 
    }

`


const FooterP2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 187.5px;
    height: 65px;
    background-color: #52B6FF;;
    color:  white;
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
