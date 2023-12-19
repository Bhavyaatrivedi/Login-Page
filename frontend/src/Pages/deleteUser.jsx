

import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = ({ onUserDeleted }) => {
  const [userIdToDelete, setUserIdToDelete] = useState('');

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/delete-user/${userIdToDelete}`);
      if (response.data.success) {
      
        setUserIdToDelete('');
        onUserDeleted(userIdToDelete);
      } else {
        console.error('User deletion failed:', response.data.msg);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setUserIdToDelete(value);
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form>
        <label>User ID:</label>
        <input
          type="text"
          value={userIdToDelete}
          onChange={handleChange}
        />

        <button type="button" onClick={handleDeleteUser}>
          Delete User
        </button>
      </form>
    </div>
  );
};

export default DeleteUser;
