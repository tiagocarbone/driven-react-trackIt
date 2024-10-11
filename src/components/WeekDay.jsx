import styled from "styled-components"
import { useState } from "react"




export default function WeekDays (props){

    const [clicked, setClicked] = useState(props.dayClicked)
   
    console.log(props.selectedDays)

    function handleClick(weekNumber){

        if(!clicked){
            setClicked(!clicked)
            props.setSelectedDays([...props.selectedDays, weekNumber])

        }
        else {
            setClicked(!clicked)
            const newArray = props.selectedDays.filter((day) => day != weekNumber)
            props.setSelectedDays(newArray)
            
        }
        
    }
    

    return <>
            <WeekDayDiv clicked={props.dayClicked  } >
              <WeekDay  clicked={props.dayClicked  } onClick={() => handleClick(props.weekNumber) } > {props.weekDay}</WeekDay>
            </WeekDayDiv>
        </>
}


const WeekDayDiv = styled.div `
   //background-color: red;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${props => props.clicked ? "#CFCFCF" : "white"};
    border: 1px solid #D4D4D4
`

const WeekDay = styled.p `
    font-family: "Lexend Deca";
    font-size: 19.98px;
    margin-top: 1px;
    font-weight: 400;
    line-height: 24.97px;
    color: ${props => props.clicked ? "white" : "#CFCFCF" };
    text-align: center;

`