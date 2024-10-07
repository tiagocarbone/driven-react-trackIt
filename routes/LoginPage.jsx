import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import Svg from "../src/assets/Svg"
import { useContext, useState } from "react"
import axios from "axios"
import UserContext from "../contexts/UserContext"
import {ThreeDots} from "react-loader-spinner"

export default function LoginPage({ setToken, token }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    const navigate = useNavigate()

    function loginForm(e) {
        e.preventDefault()
        const body = {
            email,
            password
        }

        setLoading(true)

        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
            .then((response) => {

                setToken(response.data.token)
                setUser(response.data)
                localStorage.setItem("token", response.data.token)
                navigate("/habitos")
                setLoading(false)
            })
            .catch((response) => {
                console.error(response.message)
                setLoading(false)
                setError(true)
            })

    }

    console.log(user)


    return (
        <Container>
            <Svg />


            <FormContainer>
                <form action="">

                    <input type="text" id="email" placeholder="Email" disabled={loading} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" id="password" placeholder="Password" disabled={loading} onChange={(e) => setPassword(e.target.value)} />

                    {error && <ErrorH2>Usuário ou senha incorretos</ErrorH2>} 

                    <Button onClick={(e) => loginForm(e)} > {loading ?  <ThreeDots
                                                        visible={true}
                                                        height="80"
                                                        width="80"
                                                        color="#4fa94d"
                                                        radius="9"
                                                        ariaLabel="three-dots-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                        />  : "Entrar" }   
                    </Button>
                </form>

            </FormContainer>
                    
            

            <LinkButton>  "Não tem uma conta? Cadastre-se!" </LinkButton>
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

const ErrorH2 = styled.h2`
    color: red;
    font-weight: 500;
    font-size: 18px;
    margin-top: 10px;
`

const LinkButton = styled(Link)`
    text-decoration: none;
    font-family: "Lexend Deca", sans-serif;
    font-size: 13.98px;
    font-weight: 400;
    color: #52B6FF;
    padding-top: 20px;


`