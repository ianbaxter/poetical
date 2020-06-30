import React from "react";

const PostStatus = ({ message, animation }) => {
  return (
    <section className={animation}>
      <h1>{message}</h1>
    </section>
  );
};

export default PostStatus;
