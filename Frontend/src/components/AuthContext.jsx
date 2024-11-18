
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Frontend/components/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";  // Correct import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const findUserAndAdmin = (decoded, data) => {

    console.log(decoded);

    if (decoded.authority === 'admin') {
      console.log("Admin");
      setAdmin(data);
      setUser(data);
    } else {
      setAdmin(null);
      setUser(data);
    }
  }


  useEffect(() => {
    const token_data = localStorage.getItem('token');

    const data = token_data ? JSON.parse(token_data) : null;

    if (data && data.token) {
      const decoded = jwt_decode(data.token);  // Correct usage of jwt_decode
      console.log("Decoded", decoded);
      setUser(decoded);
      findUserAndAdmin(data, decoded);
    } 
    else
    {
      setUser(null);
      setAdmin(null);
    }
  }, []);

  const login = async (email, password) => {
    try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', JSON.stringify(data));
      const decoded = jwt_decode(data.token);  // Correct usage of jwt_decode
      setUser(decoded);
      findUserAndAdmin(data, decoded);
    }
    return data
  } catch (error) {
    console.error('Error during login:', error);
    setUser(null);
    setAdmin(null);
    return { error: 'Unknown error' }; // Return an error message to the caller
  }
  };

  /*const signup = async (username, email, password) => {
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      const decoded = jwt_decode(data.token);  // Correct usage of jwt_decode
      setUser(decoded);
    }
  };*/
  const signup = async (username, email, password) => {
    try {
      
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Signup failed:', errorData.message); // Log the error message
        return; // Optionally show the error message to the user
      }
  
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', JSON.stringify(data));
        const decoded = jwt_decode(data.token);
        setUser(decoded);
        findUserAndAdmin(data, decoded);
      }

      return data; // Return the data to the caller
    } catch (error) {
      console.error('Error during signup:', error);
      setUser(null);
      setAdmin(null);

      return { error: 'Unknown error' }; // Return an error message to the caller
    }
  };

  const sendMessage = async (name, email, message) =>
  {

    try{
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (data.message) {
        alert("Message Sent Successfully");
      }
      else
      {
        alert("Message not sent");
      }
    } catch (error) {
      console.error('Error during sending message:', error);
      alert("Message not sent" + error);
    }

    
  }
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAdmin(null);
    alert("Logout successful");
  };

  return (
    <AuthContext.Provider value={{sendMessage, admin, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// Frontend/components/AuthContext.js
