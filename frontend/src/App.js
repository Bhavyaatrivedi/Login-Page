import Login from "./Pages/login"
import Signup from "./Pages/signup"
import Home from "./Pages/home"


import {  Route, Routes, Navigate } from "react-router-dom"

const App = () => {
  return (
  // <BrowserRouter>
    <Routes>
  
    <Route path="/signup" exact element={<Signup />} />
		<Route path="/" exact element={<Login />} />
    <Route path="/login" exact element={<Login />} />
    <Route path="/home" exact element={<Home />} />

    </Routes>
  // </BrowserRouter>
  )
};

export default App;