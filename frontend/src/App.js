// import Login from "./Pages/login"
// import Signup from "./Pages/signup"
// import Home from "./Pages/home"
// import ResetPassword from "./Pages/resetPassw"



// import {  Route, Routes } from "react-router-dom"

// const App = () => {
//   return (

//     <Routes>
  
//     <Route path="/signup" exact element={<Signup />} />
// 		<Route path="/" exact element={<Login />} />
//     <Route path="/login" exact element={<Login />} />
//     <Route path="/home" exact element={<Home />} />
//     <Route path="/reset-password" element={<ResetPassword />} />


//     </Routes>

//   )
// };

// export default App;


import Login from "./Pages/login"
import Signup from "./Pages/signup"
import Home from "./Pages/home"
import ResetPassword from "./Pages/resetPassw"
import ProtectedRoute from "./utils/protectedRoutes"

import {  Route, Routes } from "react-router-dom"

const App = () => {
  return (

    <Routes>
  
    <Route path="/signup" exact element={<Signup />} />
		<Route path="/" exact element={<Login />} />
    <Route path="/login" exact element={<Login />} />
    {/* <Route path="/home" exact element={<Home />} /> */}
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route path="/home" element={<Home />}>
            <Route path='' element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
        </Route>


    </Routes>

  )
};
export default App;