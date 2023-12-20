import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './logout';
import AddUser from './addUser';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/get-user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleUserAdded = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
  };

  const handleUserDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/delete-user/${userId}`);
      if (response.data.success) {
      
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
      } else {
        console.error('Error deleting user:', response.data.msg);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <LogoutButton />
      <h2>Users</h2>
      <AddUser onUserAdded={handleUserAdded} />
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Email</th>
            <th>Address</th>
            <th>Mobile No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.mobileNo}</td>
              <td>
                <button onClick={() => handleUserDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
