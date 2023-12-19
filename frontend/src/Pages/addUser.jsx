import React, { useState } from 'react';
import axios from 'axios';

const AddUser = ({ onUserAdded }) => {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    mobileNo:'',
    address:'',
  });

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:4000/add-user', newUser);
      if (response.data.created) {
        // Clear the form
        setNewUser({
          email: '',
          password: '',
          mobileNo:'',
          address:'',
        });

       
        onUserAdded(response.data.user);
      } else {
        console.error('User creation failed:', response.data.errors);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div>
      <h2>Add User</h2>
      <form>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={newUser.email}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
        />

        <label>Mobile No.</label>
          <input
           type="text"
            name="mobileNo"
            value={newUser.mobileNo}
            onChange={handleChange}
              />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={newUser.address}
          onChange={handleChange}
        />

        

        <button type="button" onClick={handleCreateUser}>
          Create User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
