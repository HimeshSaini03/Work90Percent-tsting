import "./SignUpForm.css"
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";


function SignupForm() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {user} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      {
        alert("You are Already Logged In !!");
        navigate("/home");
      }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signup(username, email, password);

    if (res.error != null && res.error != undefined) {
      alert(res.error);
    }
    else
    {
      alert("Signup successful");
      setUsername('');
      setEmail('');
      setPassword('');
      navigate('/home');
    }
  };

  return (
    <div className="signup-container"> 
    <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="SignUP">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Sign Up</button>
    </form>
    <div className="noaccount">
      <p>Already have an account?</p>
      <Link to={"/login"} className="signUp-btn">Login</Link>
      </div>
    </div>
  );
}

export default SignupForm;
