import Habits from './routes/Habits'
import LoginPage from './routes/LoginPage'
import SignInPage from './routes/SignInPage'
import Today from './routes/Today'
import { useState } from 'react'
import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import UserContext from './contexts/UserContext'

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(localStorage.getItem("user"))


  return (
    <UserContext.Provider value={[user, setUser]} >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage setToken={setToken} token={token}/>} />
        <Route path='/cadastro' element={<SignInPage/>} />
        <Route path='/habitos' element={<Habits  token={token}/>} />
        <Route path='/hoje' element={<Today  token={token} />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
