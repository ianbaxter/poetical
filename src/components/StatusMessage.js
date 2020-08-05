import React from "react";

const StatusMessage = ({ message, animation }) => {
  return (
    <section className={animation}>
      <h2>{message}</h2>
    </section>
  );
};

export default StatusMessage;
