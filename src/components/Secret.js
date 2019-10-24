import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
const axios = require("axios");

const Secret = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    console.log("getting secret");
    axios
      .get("http://localhost:8000/api/secret")
      .then(res => setMessage(res.text));
  }, []);

  return (
    <div>
      <div className="App-header">
        <h1>My Secret Blog</h1>
        <div className="navigation">
          <Link to="/" className="btn">
            Home
          </Link>
        </div>
      </div>
      <div className="main-content">
        <h2>Secret</h2>
        <p>{message}</p>
      </div>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Secret;
