import { useContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import userContext from './context/UserContext'
import {ToastContainer , toast} from 'react-toastify'
function App() {
  const [count, setCount] = useState(0)
  let token = localStorage.getItem("token");
  let ctx = useContext(userContext);
  console.log(ctx);
  useEffect(()=>{
    if(token){
      ctx.getUserData()
    }    
  },[token])

  return (
    <div>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  )
}

export default App