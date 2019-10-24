import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Register = () => {
  return (
    <div>
      <div className="App-header">
        <h1>My Blog</h1>
        <div className="navigation">
          <Link to="/" className="btn">
            Home
          </Link>
        </div>
      </div>
      <div className="main-content">
        <h2>Register</h2>
        <form
          action="http://localhost:8000/api/auth/register"
          method="post"
          encType="multipart/form-data"
        >
          <input type="text" placeholder="Username" name="username" id="" />
          <input type="text" placeholder="Email" name="email" id="" />
          <input type="text" placeholder="Password" name="password" id="" />
          <input className="btn-primary" type="submit" value="Register" />
        </form>
      </div>
      <div className="auth-navigation">
        <span>Already registered?</span>
        <Link to="/login" className="btn">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
