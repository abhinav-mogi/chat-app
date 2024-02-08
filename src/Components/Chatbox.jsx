import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Chatbox.css'

const Chatbox = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const senderUser = localStorage.getItem("user");

  

  const getMessages = () => {
    axios.get(`http://localhost:4000/user-api/conversation/${senderUser}/${selectedUser}`)
      .then((response) => {
        if (response.data.success) {
          setMessages(response.data.payload);
          console.log((response.data.payload))
        } else {
          console.log(response.data.message);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getMessages();
  }, []);
  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { sender: senderUser, receiver: selectedUser, content: newMessage, timestamp: new Date() };
      axios.post('http://localhost:4000/user-api/messages', message)
        .then(response => {
          if (response.data.success) {
            setMessages([...messages, message]); // Update messages state with new message
            setNewMessage('');
          } else {
            console.log(response.data.message);
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  return (
    <div className="chat-box-content border rounded border-dark p-3 mt-3">
      <h2>Chatting with {selectedUser}</h2>
      <div className="messages-container row ms-3">
        {messages.map((message) => (
          <div  className={`message ${message.sender === senderUser ? 'sent' : 'received'} mt-2 rounded border border-dark p-2`}>
            <span className="sender">{message.sender === senderUser ? "You" : message.sender}: </span>
            <span className="text">{message.content}</span>
          </div>
        ))}
      </div>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          value={newMessage}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbox;
