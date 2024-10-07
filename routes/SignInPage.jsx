import Svg from "../src/assets/Svg"
import styled from "styled-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {ThreeDots} from "react-loader-spinner"
import TextField from '@mui/material/TextField';

export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorName, setErrorName] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    function verifyName(e) {
        const {value} = e.target

        if(value.length < 3){
            setErrorName(true)
        }else {
            setErrorName(false)
        }

    }

    function verifyPassword(e) {
        const {value} = e.target

        if(value.length < 5){
            setErrorPassword(true)
        }else {
            setErrorPassword(false)
        }

    }

    function verifyEmail(e){
        const {value} = e.target

        if(value.length < 6){
            setErrorEmail(true)
        }else {
            setErrorEmail(false)
        }

    }

    function loginRedirect() {
        navigate("/")
    }


    function submitForm(e){
        e.preventDefault()
        setLoading(true)

        const body = {
            email,
            name,
            image,
            password
        }

        

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)
            .then((response) => {
                console.log(response.data)
                setLoading(false)
                setSuccess(true)
                /* setTimeout(loginRedirect, 2500) */
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


                    <TextField 
                        error={errorEmail}
                        id="standard-error-helper-text" 
                        label= " Email" 
                        type="email"
                        defaultValue=""
                        placeholder="Digite seu email" 
                        disabled={loading} 
                        onBlur={verifyEmail}
                        helperText={errorEmail && "O email precisa ter pelo menos 6 caracteres"} 
                        onChange={(e) => setEmail(e.target.value)}
                        variant="standard" 
                    />
                    
                    <TextField 
                        error={errorName}   
                        id="standard-error-helper-text" 
                        label= " Nome" 
                        type="name"
                        defaultValue=""
                        disabled={loading} 
                        placeholder="Digite seu nome" 
                        onBlur={verifyName}  
                        onChange={(e) => setName(e.target.value)} 
                        helperText={errorName && "O nome precisa ter pelo menos 3 caracteres"} 
                        variant="standard" 
                    />

                    
                    <TextField   
                        id="standard-error-helper-text" 
                        label= " Foto" 
                        type="text"
                        defaultValue=""
                        placeholder="URL da foto" 
                        disabled={loading} 
                        onChange={(e) => setImage(e.target.value)}
                        variant="standard" 
                    />

                    
                    <TextField 
                        error={errorPassword}   
                        id="standard-error-helper-text" 
                        label= " Senha" 
                        type="password"
                        defaultValue=""
                        placeholder="Digite sua senha" 
                        disabled={loading} 
                        onBlur={verifyPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={errorPassword && "A senha precisa ter pelo menos 6 caracteres"} 
                        variant="standard" 
                    />

                    

                    {success && <SuccessH2>Sucesso! Você redirecionado para a página de login em 2s</SuccessH2>}
                

                    <Button  style={{ opacity: loading ? 0.5 : 1 }}   onClick={ loading? "" :  (e) => submitForm(e)} > Cadastrar</Button>
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

const SuccessH2 = styled.h2`
    color: black;
    font-weight: 500;
    font-size: 18px;
    margin-top: 10px;
    font-family: "Playball", cursive;
    width: 80%;
    line-height: normal;
`