import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const BlogPost = ({ id, title, blog, date, username }) => {
  return (
    <Link to={`/blog-post-details/${id}`} className="card card--summary">
      <article className="post">
        <h3>{title}</h3>
        <p>{blog}</p>
        <div className="post__details">
          <div>
            <span>{"Posted: " + new Date(date).toLocaleString()}</span>
          </div>
          <div>
            <span>Author: {username ? username : "Anonymous"}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogPost;
