import React, { useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'


const ResetPassword = (props) => {
    
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

   
    const urlSearchString = window.location.search;

 const params = new URLSearchParams(urlSearchString);
 const token =  params.get("token");


    const response = await axios.post(`http://localhost:4000/reset-password?token=${token}`, {
      password,
      confirmPassword,

   
      });

      if (response.data.success) {
        setSuccess('Password has been reset successfully.');
        setError('');
      } else {
        setError(response.data.msg);
        setSuccess('');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Something went wrong. Please try again later.');
      setSuccess('');
    }
  };



  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your new password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
        <button type="submit">Reset Password</button>

        <button type="button" onClick={() => navigate('/login')}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
