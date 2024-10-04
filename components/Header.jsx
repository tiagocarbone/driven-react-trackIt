import styled from "styled-components"
import UserContext from "../contexts/UserContext"
import { useContext } from "react"

export default function Header(){

    const [user] = useContext(UserContext)
    console.log(user)
    return(

        <Container >
                <h1> header </h1>
                <Image src={user.image} alt="" />
        </Container>
        
    )
}


const Container = styled.div `
    width: 375px;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px 0px #00000026;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;

`

const Image = styled.img `
    width: 51px;
    height: 51px;
    border-radius: 98.5px 

`