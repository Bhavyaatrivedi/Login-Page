import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
  const [logoutStatus, setLogoutStatus] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/log-out', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      setLogoutStatus(data);

      // Redirect to login page after successful logout
      if (data.success) {
        navigate('/login');
      }
      else {
       //handling non-json response
        console.error('Non-JSON response:', response.statusText);
        setLogoutStatus({ success: false });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="absolute top-4 right-4">
        <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        onClick={handleLogout}
      >

        Logout
        </button>
      {logoutStatus && (
        <p className='text-red-500'>
            {logoutStatus.success ? 'Logout successful' : 'Logout failed'}
            </p>
      )}
    </div>
  );
};



export default LogoutButton;
