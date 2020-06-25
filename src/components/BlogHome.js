import React, { Component } from "react";
import "../App.css";
import BlogPost from "./BlogPost";
import Textarea from "react-textarea-autosize";
import Header from "./Header";
import axios from "axios";

class BlogHome extends Component {
  constructor(props) {
    super(props);
    this._isLoggedIn = false;
    this.state = {
      title: "",
      textBody: "",
      blogPosts: [],
    };
  }

  componentDidMount() {
    sessionStorage.getItem("username")
      ? (this._isLoggedIn = true)
      : (this._isLoggedIn = false);
    this.getBlogPosts();
  }

  getBlogPosts() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/blogHome")
      .then((res) => {
        let blogPostsReversed = res.data.reverse();
        this.setState({ blogPosts: blogPostsReversed });
      })
      .catch((err) => {
        console.log("Error from blogPosts:SS " + err);
      });
  }

  onSaveClick() {
    const data = {
      title: this.state.title,
      body: this.state.textBody,
      username: this._isLoggedIn
        ? sessionStorage.getItem("username")
        : "Anonymous",
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "/api/blogHome", data)
      .then((res) => {
        this.getBlogPosts();
      })
      .catch((err) => {
        console.log("Error updating blog post: " + err);
      });
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <Header isLoggedIn={this._isLoggedIn} />
        <main>
          {this._isLoggedIn ? (
            <section className="cards">
              <div className="card">
                <Textarea
                  name="title"
                  cols="50"
                  rows="1"
                  placeholder="Enter Title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                />
                <Textarea
                  name="textBody"
                  cols="50"
                  rows="1"
                  placeholder="Enter New Content"
                  value={this.state.textBody}
                  onChange={this.handleInputChange}
                />
                <button className="btn" onClick={() => this.onSaveClick()}>
                  Save
                </button>
              </div>
            </section>
          ) : null}
          <section className="cards">
            {this.state.blogPosts
              ? this.state.blogPosts.map((blogPost) => (
                  <BlogPost
                    key={blogPost._id}
                    id={blogPost._id}
                    title={blogPost.title}
                    blog={blogPost.body}
                    date={blogPost.dateEdited}
                    username={blogPost.username}
                  />
                ))
              : "There are no blog posts."}
          </section>
        </main>
      </div>
    );
  }
}

export default BlogHome;
