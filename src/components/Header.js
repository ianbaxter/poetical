import React, { useState } from "react";
import history from "../history";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
  const [menuVisible, setMenuVisible] = useState(false);

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
        {isLoggedIn ? (
          <div>
            <div
              className={"menu " + (menuVisible && "menu--active")}
              onClick={toggleMenu}
            >
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
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

export default Header;
