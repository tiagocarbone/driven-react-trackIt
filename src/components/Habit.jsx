import { useState } from "react"
import styled from "styled-components";
import axios from "axios";
import {ThreeDots} from "react-loader-spinner"



export default function Habit(props) {
    const [daysDefault, setDaysDefault] = useState([
        {
            weekDay: "D",
            weekNumber: 0
        },
        {
            weekDay: "S",
            weekNumber: 1
        },
        {
            weekDay: "T",
            weekNumber: 2
        },
        {
            weekDay: "Q",
            weekNumber: 3
        },
        {
            weekDay: "Q",
            weekNumber: 4
        },
        {
            weekDay: "S",
            weekNumber: 5
        },
        {
            weekDay: "S",
            weekNumber: 6
        },
    ])

    const [loading, setLoading] = useState(false)


    //console.log(props.days)

    function cancelHabit(){
        //alert("oi")
        setLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${props.token}` 
            }}

            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${props.habitId}`, config)
            .then((response) => {
                console.log(response)

                axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
                .then((res) => {
                    props.setHabits(res.data); 
                    setLoading(false); 
                })
                .catch((error) => {
                    console.error("Erro ao buscar hábitos:", error);
                    setLoading(false);
                });

            })
            .catch((response) => {
                console.log(response)
            })
}

    return (

            <Container>

                <h1>{props.name}</h1>


                <ContainerWeekDays>
                {daysDefault.map((d) => {
                    const habitDay = props.days.includes(d.weekNumber); // verificação para saber se d.weeknumber tá no props.days

                    return (
                        <WeekDayDiv habitDay={habitDay} key={d.weekNumber}>
                            <WeekDay habitDay={habitDay}>{d.weekDay}</WeekDay>
                            
                        </WeekDayDiv>
                    );

                })}
                <StyledP onClick={() => cancelHabit()} >{loading ? <ThreeDots
                                                        visible={true}
                                                        height="30"
                                                        width="40"
                                                        color="#52B6FF"
                                                        radius="9"
                                                        ariaLabel="three-dots-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                        /> : "x" }</StyledP>
                </ContainerWeekDays>
                
            </Container>

    )
}


const Container = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 340px;
    height: 91px;
    border-radius: 5px;
    background-color: white;
    padding-left: 10px;
    margin-top: 10px;
    
    gap: 5px;
    margin-left: 17px;
    

    h1{
        font-family: "Lexend Deca";
        font-size: 19.98px;
        font-weight: 400;
        line-height: 24.97px;
        text-align: left;

    }

`

const StyledP = styled.p `
    margin-left: 50px;
    
    font-family: "Lexend Deca";
    color: #52B6FF;
    font-size: 30px;
`

const ContainerWeekDays = styled.div`

   display: flex;
   flex-direction: row;
   

`


const WeekDayDiv = styled.div`
   //background-color: red;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${props => props.habitDay ? "#CFCFCF" : "white"};
    border: 1px solid #D4D4D4
`

const WeekDay = styled.p`
    font-family: "Lexend Deca";
    font-size: 19.98px;
    margin-top: 1px;
    font-weight: 400;
    line-height: 24.97px;
    color: ${props => props.habitDay ? "white" : "#CFCFCF"};
    text-align: center;

`
