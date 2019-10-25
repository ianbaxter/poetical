import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const BlogPost = ({ id, title, blog, date }) => {
  return (
    <div className="card-container">
      <Link to={`/blog-post-details/${id}`}>
        <h3>{title}</h3>
      </Link>
      <p className="preview-post">{blog}</p>
      <div className="blog-post-options">
        <div id="post-date">
          <span>{"Posted: " + new Date(date).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
