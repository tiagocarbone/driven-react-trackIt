import Svg from "../src/assets/Svg"
import styled from "styled-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {ThreeDots} from "react-loader-spinner"


export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    function submitForm(e){
        e.preventDefault()

        setLoading(true)

        const body = {
            email,
            name,
            image,
            password
        }

        console.log("body", body)

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)
            .then((response) => {
                console.log(response.data)
                setLoading(false)

            })
            .catch((response ) => {
                console.log(response)
                setLoading(false)
            })


    }

  

    return (
        <Container>
            <Svg />


            <FormContainer>
                <form action="">

                    <input type="text" id="email" placeholder="Email" disabled={loading} onChange={(e) => setEmail(e.target.value)} />

                    <input type="name" id="name" placeholder="Nome" disabled={loading} onChange={(e) => setName(e.target.value)} />

                    <input type="text" id="image" placeholder="Foto" disabled={loading} onChange={(e) => setImage(e.target.value)} />

                    <input type="password" id="password" placeholder="Password" disabled={loading} onChange={(e) => setPassword(e.target.value)} />

                  
                

                    <Button onClick={(e) => submitForm(e)} > Cadastrar</Button>
                </form>

            </FormContainer>





            <LinkButton to="/">Já tem uma conta? Faça login!</LinkButton>
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