import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginError, setLoginError] = useState(false);

  const handleLoginButton = async (e) => {
    e.preventDefault();
    await API.userLogin(email, password).catch(e => setLoginError(true));
    if (API.userIsLoggedIn()) navigate("/scorecards/0");
  }

  return(
    <div className="container">
      <h1>Welcome</h1>
      <p>This is the judging app. Please login.</p>
      {loginError && 
        <p style={{textColor: "red"}}>Error logging in</p>
      }
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" />
        </div>
        <button onClick={handleLoginButton} type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p>New here? <Link to="/register">Register first</Link></p>
    </div>
  )
}