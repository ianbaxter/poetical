import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
  function onLogoutClick() {
    sessionStorage.removeItem("username");
    window.location.reload();
  }

  return (
    <div className="App-header">
      <Link to="/">
        <h1>Blog</h1>
      </Link>
      {isLoggedIn && <span>Hi {sessionStorage.getItem("username")}</span>}
      <div className="navigation">
        {isLoggedIn ? (
          <button className="btn" onClick={onLogoutClick}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
