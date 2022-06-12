import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes, 
  Link
} from "react-router-dom";
import Home from "./pages/Home";  
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogpage from "./pages/Blogpage";
import CreatePost from "./pages/CreatePost";
import React, { useEffect, useState } from "react";
// import Login from "./pages/Log";
import {useNavigate} from 'react-router-dom'
function App() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')))
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
      navigate('/')
    }

  },[token])
  return (
   
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route  path='/login' element={<Login/>}/> 
        <Route  path='/register' element={<Register/>}/>
        <Route  path='/blog/:username/:slug' element={<Blogpage/>}/>
        {token && <Route path='/create' element={<CreatePost/>}/>} 
      </Routes>
   
  );
}
export default App; 
