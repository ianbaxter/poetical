import React, { useState } from "react";
import { Link } from "react-router-dom";
import history from "../history";
import Header from "../components/Header";
import "../App.css";

const Register = () => {
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

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
    fetch(process.env.REACT_APP_BASE_URL + "/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          history.push("/login");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error registering please try again");
      });
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="entry">
          <h2>Register</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
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
          <p>Already registered?</p>
          <Link to="/login" className="btn">
            Login
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Register;
