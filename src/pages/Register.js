import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegisterButton(e) {
    e.preventDefault();
    console.log(`Registering user with ${email} and ${password}`)
    await API.userRegister(email, password);
    navigate("/");
  }

  return(
    <div className="container-fluid">
      <h1>Please Register</h1>
      <p>This is the judging app. Please register with you @mongodb.com email address.</p>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" />
        </div>
        <button onClick={handleRegisterButton} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Register;