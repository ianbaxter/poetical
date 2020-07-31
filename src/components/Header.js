import React, { useState } from "react";
import history from "../history";
import { Link } from "react-router-dom";
import { useTheme } from "../styles/ThemeContext";
import { withTheme } from "styled-components";

const Header = (props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const themeToggle = useTheme();

  function onLogoutClick() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    if (history.location.pathname === "/") {
      window.location.reload();
    } else {
      history.push("/");
    }
  }

  const toggleMenu = () => {
    if (menuVisible) setMenuVisible(false);
    else setMenuVisible(true);
  };

  const navHome = (e) => {
    if (history.location.pathname === "/") {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <header>
      <div id="top">
        <Link to="/" onClick={(e) => navHome(e)}>
          <h1>Poetical</h1>
        </Link>
        <div className="visible-top-options">
          {props.isLoggedIn ? (
            <div
              className={"menu " + (menuVisible && "menu--active")}
              onClick={toggleMenu}
            >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
          <button
            className="btn btn--minimal"
            onClick={() => themeToggle.toggle()}
          >
            {props.theme.mode === "dark" ? (
              <svg
                className="toggle-night"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="30px"
                height="30px"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z" />
              </svg>
            ) : (
              <svg
                className="toggle-day"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="30px"
                height="30px"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="top-options-wrapper">
        <nav
          className={"user-options " + (menuVisible && "user-options--active")}
        >
          <button className="btn" onClick={onLogoutClick}>
            Logout
          </button>
          <Link
            to={"/user/" + sessionStorage.getItem("userId")}
            className="btn"
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default withTheme(Header);
