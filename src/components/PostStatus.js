import React from "react";

const PostStatus = ({ message, animation }) => {
  return (
    <section className={animation}>
      <h2>{message}</h2>
    </section>
  );
};

export default PostStatus;
