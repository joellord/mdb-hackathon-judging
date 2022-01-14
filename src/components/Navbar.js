import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Navbar(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  useEffect(() => {
    const main = async () => {
      const e = await API.getUserEmail();
      setEmail(e);
    }
    main();
  }, []);

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    await API.userLogout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">MongoDB Hackathon</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/scorecards/0">Home</Link>
            </li>
            {props.addBackTo &&
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={`/scorecards/${props.addBackTo.id}`}>Back to category {props.addBackTo.category}</Link>
            </li>
            }
          </ul>
          <div className="px-2">Welcome {email}</div>
          <form className="d-flex">
            <button onClick={handleLogoutClick} className="btn btn-outline-success" type="submit">Logout</button>
          </form>
        </div>
      </div>
    </nav>
  )
}