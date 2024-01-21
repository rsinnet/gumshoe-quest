import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox: React.FC = () => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message.trim() !== '') {
            console.log('Sending message:', message);
            // Add logic to handle the message (e.g., send to backend or add to message list)
            setMessage(''); // Clear input field after sending
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chat-box">
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">Send</button>
        </div>
    );
};

export default ChatBox;
