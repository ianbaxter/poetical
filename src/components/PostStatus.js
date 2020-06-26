import React from "react";

const PostStatus = ({ message }) => {
  return (
    <section className="post-status">
      <h1>{message}</h1>
    </section>
  );
};

export default PostStatus;
