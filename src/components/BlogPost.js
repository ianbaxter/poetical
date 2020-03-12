import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const BlogPost = ({ id, title, blog, date, username }) => {
  return (
    <Link
      to={`/blog-post-details/${id}`}
      className="card-container card-container-summary"
    >
      <article className="post">
        <h3>{title}</h3>
        <p className="preview-post">{blog}</p>
        <div className="blog-post-options">
          <div className="blog-post-detail">
            <span>{"Posted: " + new Date(date).toLocaleString()}</span>
          </div>
          <div className="blog-post-detail">
            <span>Author: {username ? username : "Anonymous"}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogPost;
