import React from "react";

const Footer = ({ message, link }) => {
  return (
    <footer>
      <a href={link}>{message}</a>
    </footer>
  );
};

export default Footer;
