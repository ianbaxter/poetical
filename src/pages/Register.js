import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from "../history";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
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
    if (username === "" || email === "" || password === "") return;
    fetch(process.env.REACT_APP_BASE_URL + "/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
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
        setErrorMessage(
          "Please check the username is at least 3 characters and the password is at least 6 characters."
        );
      });
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="cards entry">
          <form onSubmit={onSubmit} className="card">
            <label htmlFor="username" id="login-username">
              Username:
            </label>
            <input
              type="text"
              aria-labelledby="login-username"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleInputChange}
              autoComplete="username"
            />
            <label htmlFor="email" id="login-email">
              Email:
            </label>
            <input
              type="email"
              aria-labelledby="login-email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
              autoComplete="email"
            />
            <label htmlFor="password" id="login-password">
              Password:
            </label>
            <input
              type="password"
              aria-labelledby="login-password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <button className="btn btn--full-width" type="submit">
              Register
            </button>
          </form>
          <div className="entry__nav card-width-wrapper">
            <p>
              Already registered? <Link to="/login">Login</Link>
            </p>
            <p className="font--secondary-color">{errorMessage}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
