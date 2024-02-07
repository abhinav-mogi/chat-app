import React, { useState } from 'react';

const Chatbox = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };
  return (
    <div className="chat-box-content border rounded  border-dark p-3 mt-3">
      <h2>Chatting with {selectedUser}</h2>
      <div className="messages-container">
        {messages.map((message, index) =>(
          <div key={index} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
            <span className="sender">{message.sender}: </span>
            <span className="text">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="input-group mt-3" >
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
