import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Svg from "../src/assets/Svg"
import { useContext, useState } from "react"
import axios from "axios"
import UserContext from "../contexts/UserContext"


export default function LoginPage({setToken, token}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useContext(UserContext)

    const navigate = useNavigate()

    function loginForm(e) {
        e.preventDefault()
        const body = {
            email,
            password
        } 

        

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
            .then((response) => {
                
                setToken(response.data.token)
                setUser(response.data)
                localStorage.setItem("token", response.data.token)
                navigate("/habitos")
            })
            
    }

    console.log(token)


    return (
        <Container>
           <Svg/>


            <FormContainer>
                <form action="">

                    <input type="text" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                    <Button onClick={(e) => loginForm(e)} >Entrar</Button>
                </form>

            </FormContainer>

            <LinkButton  to="/cadastro">Não tem uma conta? Cadastre-se!</LinkButton>
        </Container>

    )
}

const Container = styled.div`
    padding-top: 40px;
    width: 375px;
    height: 667px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        font-family: "Playball", cursive;
        font-size: 68px;
        color: #126BA5;
        font-weight: 400;
        font-style: normal;
    }

    

`

const FormContainer = styled.div`
    width: inherit;
    form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
   
    input{
        width: 297px;
        height: 45px;
        border: 1px solid #D4D4D4
    }
    input:focus{
        border-color: #52B6FF;
        outline: #52B6FF;
    }
  }
    
    

`

const Button = styled.div`
    width: 303px;
    height: 45px;
    background-color: #52B6FF;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Lexend Deca", sans-serif;
    font-family: Lexend Deca;
    font-size: 20.98px;
    color: white;
    margin-top: 20px;
`

const LinkButton = styled(Link)`
    text-decoration: none;
    font-family: "Lexend Deca", sans-serif;
    font-size: 13.98px;
    font-weight: 400;
    color: #52B6FF;
    padding-top: 20px;


`