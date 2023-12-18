
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './logout';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get the list 
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

  return (
   
    <div>
      <LogoutButton/>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
        
            <th>Email</th>
            <th>Address</th>
            <th>Mobile No</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
            
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.mobileNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

