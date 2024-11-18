import '../styles/message.css';
import React, { useEffect, useState } from 'react'

const Messages = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/contact');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }

        fetchMessages();
    });

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this message?")) {
            return;
        }

        await fetch(`http://localhost:3000/api/contact/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setMessages(messages.filter(message => message._id !== id));
        })
    }
 
  return (
    <div className='message-cont'>
        <h1>Messages</h1>
        <div className='all-messages'>
            {messages.map(message => (
            <div className='message' key={message._id}>
                <h2>{message.name}</h2>
                <p>{message.email}</p>
                <p>{message.message}</p>
                <button className='btn btn-danger' 
                onClick={() => handleDelete(message._id)}>Delete</button>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Messages