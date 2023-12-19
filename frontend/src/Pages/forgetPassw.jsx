import React, { useState } from 'react';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/forget-password', { email });

      if (response.data.success) {
        setSuccess('Password reset email sent. Check your email inbox.');
        setError('');
      } else {
        setError(response.data.msg);
        setSuccess('');
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      setError('Something went wrong. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
