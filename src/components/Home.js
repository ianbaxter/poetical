import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Post from "./Post";
import Textarea from "react-textarea-autosize";
import Header from "./Header";
import Footer from "./Footer";
import PostStatus from "./PostStatus";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this._isLoggedIn = false;
    this.state = {
      title: "",
      textBody: "",
      posts: null,
    };
  }

  componentDidMount() {
    sessionStorage.getItem("username")
      ? (this._isLoggedIn = true)
      : (this._isLoggedIn = false);
    this.getPosts();
  }

  getPosts() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/blogHome")
      .then((res) => {
        let postsReversed = res.data.reverse();
        let numPosts = Object.keys(postsReversed).length;
        numPosts > 0
          ? this.setState({ posts: postsReversed })
          : this.setState({ posts: "Empty" });
      })
      .catch((err) => {
        console.log("Error from posts: " + err);
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
        this.getPosts();
        this.setState({ title: "" });
        this.setState({ textBody: "" });
      })
      .catch((err) => {
        console.log("Error updating post: " + err);
      });
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="wrapper">
        <Header isLoggedIn={this._isLoggedIn} />
        <main
          className={
            this.state.posts === null || this.state.posts === "Empty"
              ? "main--loading"
              : undefined
          }
        >
          {this._isLoggedIn && (
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
          )}
          {this.state.posts === null ? (
            <PostStatus message={"Loading Posts . . ."} />
          ) : this.state.posts === "Empty" ? (
            <PostStatus message={"There are no posts"} />
          ) : (
            <div>
              <section className="cards">
                {this.state.posts.map((post) => (
                  <Link
                    to={{
                      pathname: `/blog-post-details/${post._id}`,
                      state: {
                        post,
                      },
                    }}
                    className="card post--summary"
                    key={post._id}
                  >
                    <Post
                      id={post._id}
                      title={post.title}
                      body={post.body}
                      date={post.dateEdited}
                      username={post.username}
                      favs={post.meta.favs}
                    />
                  </Link>
                ))}
              </section>
              <section className="bottom">
                <a href="#top">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="36px"
                    height="36px"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                  </svg>
                </a>
              </section>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;
