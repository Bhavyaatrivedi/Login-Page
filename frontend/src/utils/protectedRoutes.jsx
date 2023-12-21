// // In ProtectedRoute.js or wherever you define your ProtectedRoute component
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './authProvider';
// import Cookies from 'js-cookie';

// export const ProtectedRoute = ({ element, ...rest }) => {
//   const { isAuthenticated } = useAuth();
//   console.log(isAuthenticated,"isAuthenticatedisAuthenticatedisAuthenticated")
//   const userCookie = Cookies.get('user');
//   const isUserLoggedIn = userCookie && userCookie.token;

//   // const auth = null;

  
//   return isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />;


//   // return isAuthenticated ? (
//   //   <Route element={element} {...rest} />
//   // ) : (
//   //   <></>
//   //   // <Navigate to="/login" />
//   // );
// };


// In ProtectedRoute.js or wherever you define your ProtectedRoute component


// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './authProvider';
// import Cookies from 'js-cookie';

// export const ProtectedRoute = ({ element, ...rest }) => {
//   const { isAuthenticated } = useAuth();
//   console.log(isAuthenticated,"isAuthenticatedisAuthenticatedisAuthenticated")

//   // Check if the user cookie exists
//   const userCookie = Cookies.get('user');
//   console.log(userCookie.token)
//   const isUserLoggedIn = userCookie && userCookie.token;

//   return isAuthenticated && isUserLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />;
// };


// In ProtectedRoute.js or wherever you define your ProtectedRoute component
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './authProvider';
import Cookies from 'js-cookie';

export const ProtectedRoute = ({ element, ...rest }) => {
  // const { isAuthenticated } = useAuth();

  // console.log('isAuthenticated:', isAuthenticated);

 
  const userCookie = Cookies.get('user');
  console.log('userCookie:', userCookie);


  // const isUserLoggedIn = userCookie && userCookie.token;

  // console.log('isUserLoggedIn:', isUserLoggedIn);


 
    return userCookie ? <Navigate to="/home" /> : <Navigate to="/login" />;
};
