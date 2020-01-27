import React, { Component } from "react";
import "../App.css";
import BlogPost from "./BlogPost";
import { Link } from "react-router-dom";
import Textarea from "react-textarea-autosize";
const axios = require("axios");

class BlogHome extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      textBody: "",
      blogPosts: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getBlogPosts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getBlogPosts() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/blogHome")
      .then(res => {
        if (this._isMounted) {
          this.setState({ blogPosts: res.data });
        }
      })
      .catch(err => {
        console.log("Error from blogPosts:SS " + err);
      });
  }

  onSaveClick() {
    const data = {
      title: this.state.title,
      body: this.state.textBody
    };

    axios
      .post(process.env.REACT_APP_BASE_URL + "/api/blogHome", data)
      .then(res => {
        this.getBlogPosts();
      })
      .catch(err => {
        console.log("Error updating blog post: " + err);
      });
  }

  handleTextEdit = event => {
    switch (event.target.name) {
      case "title":
        this.setState({ title: event.target.value });
        break;
      case "textBody":
        this.setState({ textBody: event.target.value });
        break;
      default:
        break;
    }
  };

  render() {
    let blogPostList;
    if (!this.state.blogPosts) {
      blogPostList = "There are no blog posts.";
    } else {
      let blogPostsReversed = [...this.state.blogPosts].reverse();
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
            <h1>Blog</h1>
          </Link>
          <div className="navigation">
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        </div>
        <div className="blog-posts">
          <div className="card-container new-blog-post">
            <Textarea
              name="title"
              cols="50"
              rows="1"
              placeholder="Enter Title"
              value={this.state.title}
              onChange={this.handleTextEdit}
            />
            <Textarea
              name="textBody"
              cols="50"
              rows="1"
              placeholder="Enter New Content"
              value={this.state.textBody}
              onChange={this.handleTextEdit}
            />
            <button className="btn" onClick={() => this.onSaveClick()}>
              Save
            </button>
          </div>
        </div>
        <article className="blog-posts">{blogPostList}</article>
      </div>
    );
  }
}

export default BlogHome;
