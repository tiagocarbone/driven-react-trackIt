import styled from "styled-components"
import axios from "axios"
import { useEffect } from "react";

export default function TodayHabit(props) {

    
        function handleClick(){

                const config = {
                    headers: {
                        Authorization: `Bearer ${props.token}`
                    }}
        
                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${65703}/check`, config )
                .then((response) => {
                  console.log(response)       
                   })
            }
        
    
            
    

   


    console.log(props.token)

    return (

        <Container>



            <ContainerInfo>
                <StyledName>{props.name}</StyledName>
                <StyledP>Sequencia atual: {props.currentSequence}</StyledP>
                <StyledP>Seu recorde: {props.highestSequence}</StyledP>


            </ContainerInfo>

            <StyledButton done={props.done} onClick={() => handleClick()} >
                <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.5686 0.956629C30.1694 0.350274 30.9857 0.00637472 31.8392 8.77323e-05C32.6928 -0.00619925 33.5141 0.325638 34.1237 0.923077C34.7333 1.52052 35.0816 2.33498 35.0926 3.18846C35.1035 4.04195 34.7761 4.86506 34.182 5.4779L16.9915 26.9682C16.6962 27.2862 16.3398 27.5413 15.9437 27.7185C15.5476 27.8957 15.1198 27.9912 14.6859 27.9994C14.252 28.0076 13.821 27.9283 13.4184 27.7662C13.0159 27.6041 12.6502 27.3625 12.3431 27.0559L0.945601 15.6628C0.339937 15.0569 -0.000205509 14.2351 9.31541e-08 13.3784C0.000205695 12.5216 0.340743 11.7001 0.946698 11.0944C1.55265 10.4887 2.37439 10.1486 3.23113 10.1488C4.08788 10.149 4.90945 10.4895 5.51511 11.0955L14.5292 20.1117L29.4831 1.05749C29.5103 1.02282 29.5396 0.989868 29.5708 0.958822L29.5686 0.956629Z" fill="white" />
                </svg>



            </StyledButton>
        </Container>

    )
}


const ContainerInfo = styled.div`
   
   

`

const Container = styled.div`
     background-color: white;
    width: 340px;
    height: 94px;
    border: 1px;
    margin-top: 10px;
    margin-left: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const StyledName = styled.p`
    font-family: "Lexend Deca";
    font-size: 19.98px;
    font-weight: 400;
    line-height: 24.97px;
    color: #666666;
    padding-left: 5px;
    padding-top: 10px;

`

const StyledP = styled.p`
    font-family: "Lexend Deca";
    font-size: 12.98px;
    font-weight: 400;
    line-height: 16.22px;
    padding-left: 5px;
    padding-top: 3px;


`

const StyledButton = styled.div`
    width: 69px;
    height: 69px;
    background-color: ${(props) => (props.done ? "#8FC549" : "#EBEBEB")};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    opacity: 0px;
    border: 1px solid #E7E7E7;
    margin-right: 20px;

`
