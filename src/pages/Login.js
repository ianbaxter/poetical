import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from "../history";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_BASE_URL + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .then((data) => {
        // Add data to sessionStorage
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("userId", data.userId);
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="entry">
          <h2>Login</h2>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <button className="btn btn--submit" type="submit">
              Submit
            </button>
          </form>
        </section>
        <section className="entry-nav">
          <p>Not yet registered?</p>
          <Link to="/register" className="btn">
            Register
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
