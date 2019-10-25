import React, { useEffect, useState } from "react";
import "../App.css";
import BlogPost from "./BlogPost";
import { Link } from "react-router-dom";
import Textarea from "react-textarea-autosize";
const axios = require("axios");

const BlogHome = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    getBlogPosts();
  }, []);

  // Get all blog posts
  const getBlogPosts = () => {
    console.log("Getting blog posts");
    axios
      .get("http://localhost:8000/api/blogHome")
      .then(res => {
        setBlogPosts(res.data);
      })
      .catch(err => {
        console.log("Error from blogPosts:SS " + err);
      });
  };

  let blogPostList;
  if (!blogPosts) {
    blogPostList = "There are no blog posts.";
  } else {
    let blogPostsReversed = [...blogPosts].reverse();
    blogPostList = blogPostsReversed.map(blogPost => (
      <BlogPost
        key={blogPost._id}
        id={blogPost._id}
        title={blogPost.title}
        blog={blogPost.body}
        date={blogPost.dateEdited}
      />
    ));
  }

  return (
    <div>
      <div className="App-header">
        <Link to="/">
          <h1>My Blog</h1>
        </Link>
        <div className="navigation">
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </div>
      <div className="blog-posts">
        <form
          className="card-container new-blog-post"
          action="http://localhost:8000/api/blogHome"
          method="POST"
          encType="multipart/form-data"
        >
          <h3>New post</h3>
          <Textarea name="title" cols="50" rows="1" placeholder="Title" />
          <Textarea name="body" cols="50" rows="1" placeholder="Content" />
          <input type="submit" className="btn" value="Save" />
        </form>
      </div>
      <article className="blog-posts">{blogPostList}</article>
    </div>
  );
};

export default BlogHome;
