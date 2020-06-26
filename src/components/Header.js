import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
  function onLogoutClick() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    window.location.reload();
  }

  return (
    <header>
      <div id="top">
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
      </div>
    </header>
  );
};

export default Header;
