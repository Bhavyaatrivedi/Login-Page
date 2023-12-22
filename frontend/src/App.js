import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./utils/protectedRoutes";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Home from "./Pages/home";
import ResetPassword from "./Pages/resetPassw";
import { AuthProvider } from "./utils/authProvider";
import Upload from "./Pages/upload";
import InputFields from "./Pages/inputFields";


const App = () => {
  return (
   
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route exact path='/home' element={<ProtectedRoute/>}>
          </Route> */}
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/input-field" element={<InputFields />} />

          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
  
  );
};

export default App;
