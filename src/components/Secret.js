import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

const Secret = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    console.log("getting secret");
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/secret", {
        withCredentials: true
      })
      .then(res => {
        console.log("Recieved secret" + res);
        setMessage(res.data.text);
      });
  }, []);

  return (
    <div>
      <div className="App-header">
        <h1>Secret Blog</h1>
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
