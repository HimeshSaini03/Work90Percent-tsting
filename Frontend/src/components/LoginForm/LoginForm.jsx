import "./LoginForm.css"
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);


  useEffect(() => {
    if (user)
      {
        alert("You are Already Logged In !!");
        navigate("/home");
      }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);

    if (res.error != null && res.error != undefined) {
      alert(res.error);
    }
    else
    {
      alert("Login successful");
      setEmail('');
      setPassword('');
      navigate('/home');
  };
}



  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="LOGIN">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <div className="noaccount">
      <p>Don't have an account?</p>
      <Link to={"/signup"} className="signUp-btn">Sign Up</Link>
      </div>
    </div>
  );
}


export default LoginForm;
