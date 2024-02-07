import React, { useState } from 'react';
import Chatbox from './Chatbox';
import axios from 'axios'


const Users= () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users,setUsers]=useState([])
  const getusers=async()=>{
    try{
      const response=await axios.get("http://localhost:4000/user-api/get-users")
      const data=response.data.payload;
      setUsers(data)
      // console.log(data)
    }catch{
      console.log("error")
    }
  }
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  getusers();
  return (
    <div className="container">
      <div className="row mt-3 ">
        <div className="col-md-3">
          <div className="user-list-container border rounded border-dark">
            <h2>Users</h2>
            <ul className="list-group">
              {users.map((user) => (
                <li
                  key={user.id}
                  className={`list-group-item ${selectedUser && selectedUser=== user.username? 'active' : ''}`}
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
                
                {/* Your chat box component goes here */}
                <Chatbox selectedUser={selectedUser}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
