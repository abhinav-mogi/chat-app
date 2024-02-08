import React, { useState, useEffect } from 'react';
import Chatbox from './Chatbox';
import axios from 'axios'

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const senderUser = localStorage.getItem("user");

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (users.length === 0) {
          const response = await axios.get("http://localhost:4000/user-api/get-users");
          const data = response.data.payload;
          const filteredUsers = data.filter(user => user.username !== senderUser);
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    getUsers();
  }, [users, senderUser]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-3">
          <div className="user-list-container border rounded border-dark">
            <h2>Users</h2>
            <ul className="list-group">
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`list-group-item ${selectedUser && selectedUser === user.username ? 'active' : ''}`}
                  onClick={() => handleUserClick(user.username)}
                >
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="chat-box">
            {selectedUser && (
              <div className="chat-box-content">
                <Chatbox key={selectedUser} selectedUser={selectedUser} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
