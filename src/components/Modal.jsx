import styled from "styled-components"
import { useState } from "react"
import TextField from '@mui/material/TextField';
import WeekDay from "./WeekDay";
import axios from "axios";

export default function Modal(props){

    const [daysArray, setDaysArray] = useState([])
    const [click, setClick] = useState(false)
    const[habit, setHabit] = useState("")
    const [days, setDays] = useState([
        {
           weekDay : "D",
           weekNumber : 0
        },
        {
            weekDay : "S",
            weekNumber : 1
        },
        {
            weekDay : "T",
            weekNumber : 2
        },
        {
            weekDay : "Q",
            weekNumber : 3
        },
        {
            weekDay : "Q",
            weekNumber : 4
        },
        {
            weekDay : "S",
            weekNumber : 5
        },
        {
            weekDay : "S",
            weekNumber : 6
        },
    ])

    const [selectedDays, setSelectedDays] = useState([])
    selectedDays.sort((a, b) => a - b)
    

    function cancelModal(){
        props.setShowModal(!props.showModal)
        
    }

    function saveHabit(e){
        e.preventDefault()
        const body = {
            name: habit,
            days: selectedDays
        }

        const config = {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        };

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
        .then((response) => {
            console.log(response.data)
            props.setShowModal(!props.showModal)
        })
        .then(() => {
            axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
            .then((res) => {
                props.setHabits(res.data);
                console.log(res.data)
            })
            .catch((error) => {
                console.error("Erro ao buscar hábitos:", error);
            });
        })
        .catch((response) => {
            console.log(response)
        })

       
       
    }


    return (
        <ModalContainer>
            <form action="">

                    <TextField
                            error={false}
                            id="outlined-error-helper-text"
                            //label="nome do hábito"
                            placeholder="nome do hábito" 
                            type="text"
                            defaultValue=""
                            style={{ width: '85%' }}
                            onChange={(e) => setHabit(e.target.value)}
                            //helperText="Incorrect entry."
                    />
            </form>


                    <ContainerWeekDay>
                        {days.map((day) => (
                            <WeekDay key={day.weekNumber} weekNumber={day.weekNumber} weekDay={day.weekDay} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
                        ))}
                        
                    </ContainerWeekDay>
                    <ButtonsModalContainer>
                        <p onClick={()=>cancelModal() } >Cancelar</p>
                        <SaveButton>
                            <p onClick={(e) => saveHabit(e)} >Salvar</p>
                        </SaveButton>
                    </ButtonsModalContainer>

          
        </ModalContainer>
    )
}



const ModalContainer = styled.div `
    width: 340px;
    height: 180px;
    border-radius: 5px;
    background-color: white;
    margin: auto;
    margin-top: 25px;
    
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 10px;
    }

`

const ContainerWeekDay = styled.div `

    display: flex;
    align-items: center;
    margin-top: 10px;
    gap: 5px;
    margin-left: 25px;
`


const ButtonsModalContainer = styled.div`
    display: flex;

    gap: 45px;
    margin-top: 25px;
    justify-content: center;
    align-items: center;
    color:  #52B6FF;
    font-family: "Lexend Deca";
    font-size: 15.98px;
    font-weight: 400;
    line-height: 19.97px;
    text-align: center;
`

const SaveButton = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #52B6FF;
    color: white;
    font-family: "Lexend Deca";
    font-size: 15.98px;
    font-weight: 400;
    text-align: center;
    width: 84px;
    height: 35px;
    border-radius: 4px;

`

