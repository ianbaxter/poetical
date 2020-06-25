import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
  function onLogoutClick() {
    sessionStorage.removeItem("username");
    window.location.reload();
  }

  return (
    <header className="header-app">
      <Link to="/">
        <h1>Chat Wall</h1>
      </Link>
      {isLoggedIn && <span>Hi {sessionStorage.getItem("username")}</span>}
      <nav>
        {isLoggedIn ? (
          <button className="btn" onClick={onLogoutClick}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
