import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./utils/protectedRoutes";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Home from "./Pages/home";
import ResetPassword from "./Pages/resetPassw";
import { AuthProvider } from "./utils/authProvider";

const App = () => {
  return (
   
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <ProtectedRoute path="/home" element={<Home />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
  
  );
};

export default App;
