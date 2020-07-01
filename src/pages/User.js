import React, { useState, useEffect } from "react";
import Textarea from "react-textarea-autosize";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [usernameEditMode, setUsernameEditMode] = useState(false);
  const [passwordEditMode, setPasswordnameEditMode] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          "/api/account/" +
          sessionStorage.getItem("userId"),
        { withCredentials: true }
      )
      .then((res) => {
        setUser(res.data);
        setEmail(res.data.email);
        setUsername(res.data.username);
      })
      .catch((err) => console.log("Error getting user: " + err));
  };

  const saveEditedUser = (userField) => {
    let data = {};
    switch (userField) {
      case "email":
        data = { email };
        axios
          .put(
            process.env.REACT_APP_BASE_URL +
              "/api/account/" +
              sessionStorage.getItem("userId"),
            data,
            { withCredentials: true }
          )
          .then((res) => {
            setUser(res.data);
            setEmailEditMode(false);
          })
          .catch((err) => {
            console.log("Error updating user: " + err);
          });
        break;
      case "username":
        data = { username };
        axios
          .put(
            process.env.REACT_APP_BASE_URL +
              "/api/account/" +
              sessionStorage.getItem("userId"),
            data,
            { withCredentials: true }
          )
          .then((res) => {
            updatePostsByUser(user, username);
            sessionStorage.setItem("username", username);
            setUser(res.data);
            setUsernameEditMode(false);
          })
          .catch((err) => {
            console.log("Error updating user: " + err);
          });
        break;
      case "password":
        data = { password };
        axios
          .put(
            process.env.REACT_APP_BASE_URL +
              "/api/account/" +
              sessionStorage.getItem("userId"),
            data,
            { withCredentials: true }
          )
          .then((res) => {
            setUser(res.data);
            setPasswordnameEditMode(false);
          })
          .catch((err) => {
            console.log("Error updating user: " + err);
          });
        break;
      default:
        return;
    }
  };

  const editUser = (userField) => {
    switch (userField) {
      case "email":
        setEmailEditMode(true);
        break;
      case "username":
        setUsernameEditMode(true);
        break;
      case "password":
        setPasswordnameEditMode(true);
        break;
      default:
        return;
    }
  };

  const cancelEditUser = (userField) => {
    switch (userField) {
      case "email":
        setEmail(user.email);
        setEmailEditMode(false);
        break;
      case "username":
        setUsername(user.username);
        setUsernameEditMode(false);
        break;
      case "password":
        setPassword("");
        setPasswordnameEditMode(false);
        break;
      default:
        return;
    }
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        return;
    }
  };

  return (
    <div className="wrapper">
      <Header isLoggedIn={sessionStorage.getItem("username")} />
      <main className="cards">
        <div className="card">
          <label htmlFor="email">Email:</label>
          {emailEditMode ? (
            <div>
              <input
                type="email"
                placeholder="New Email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              <div className="options options--margin-bot">
                <div className="options__left">
                  <button
                    className="btn btn--left"
                    onClick={() => saveEditedUser("email")}
                  >
                    Save
                  </button>
                </div>
                <div className="options__right">
                  <button
                    className="btn btn--right"
                    onClick={() => cancelEditUser("email")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>{email}</p>
              <div className="options options--nav">
                <div className="options__left">
                  <button className="btn" onClick={() => editUser("email")}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
          <hr className="divider" />
          <label htmlFor="username">Username:</label>
          {usernameEditMode ? (
            <div>
              <Textarea
                name="username"
                cols="50"
                rows="1"
                value={username}
                onChange={handleInputChange}
              />
              <div className="options options--margin-bot">
                <div className="options__left">
                  <button
                    className="btn btn--left"
                    onClick={() => saveEditedUser("username")}
                  >
                    Save
                  </button>
                </div>
                <div className="options__right">
                  <button
                    className="btn btn--right"
                    onClick={() => cancelEditUser("username")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>{username}</p>
              <div className="options options--nav">
                <div className="options__left">
                  <button className="btn" onClick={() => editUser("username")}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
          <hr className="divider" />
          {passwordEditMode ? (
            <div>
              <input
                type="new-password"
                placeholder="New Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <div className="options options--margin-bot">
                <div className="options__left">
                  <button
                    className="btn btn--left"
                    onClick={() => saveEditedUser("password")}
                  >
                    Save
                  </button>
                </div>
                <div className="options__right">
                  <button
                    className="btn btn--right"
                    onClick={() => cancelEditUser("password")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div name="password" className="options options--nav">
                <div className="options__left">
                  <button
                    className="btn btn--collaborate"
                    onClick={() => editUser("password")}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default User;

function updatePostsByUser(user, username) {
  const usernameData = {
    username: user.username,
    newUsername: username,
  };
  axios
    .put(process.env.REACT_APP_BASE_URL + "/api/account/", usernameData, {
      withCredentials: true,
    })
    .then((res) => console.log("User posts updated with new username"))
    .catch((err) => {
      console.log("Error updating user: " + err);
    });
}
