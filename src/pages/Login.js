import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from "../history";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { value, name } = e.target;
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") return;
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
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("userId", data.userId);
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("The user name or password provided is incorrect.");
      });
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="cards entry">
          <form onSubmit={onSubmit} className="card">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              autoComplete="email"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
            <button className="btn btn--full-width" type="submit">
              Login
            </button>
          </form>
          <div className="entry__nav card-width-wrapper">
            <p className="font--secondary-color">
              Not yet registered? <Link to="/register">Sign up</Link>
            </p>
            <p className="font--secondary-color">{errorMessage}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
