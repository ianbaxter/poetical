import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Post from "../components/Post";
import Textarea from "react-textarea-autosize";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostStatus from "../components/PostStatus";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this._isLoggedIn = sessionStorage.getItem("username");
    this.state = {
      title: "",
      body: "",
      tags: "",
      isPrivate: false,
      posts: null,
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/home")
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

  saveNewPost() {
    let tags = [];
    if (this.state.tags !== "") tags = this.state.tags.split(",");
    const data = {
      title: this.state.title,
      body: this.state.body,
      username: sessionStorage.getItem("username"),
      userId: sessionStorage.getItem("userId"),
      tags,
      isPrivate: this.state.isPrivate,
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "/api/home", data)
      .then((res) => {
        this.getPosts();
        this.setState({ title: "", body: "", tags: "", isPrivate: false });
      })
      .catch((err) => {
        console.log("Error updating post: " + err);
      });
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "isPrivate") this.setState({ [name]: e.target.checked });
    else this.setState({ [name]: value });
  };

  render() {
    const userId = sessionStorage.getItem("userId");
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
          {this.state.posts === null ? (
            <PostStatus
              message={"Loading Posts . . ."}
              animation={"animate-flicker"}
            />
          ) : this.state.posts === "Empty" ? (
            <PostStatus message={"There are no posts"} />
          ) : (
            <div>
              {this._isLoggedIn && (
                <section className="cards">
                  <div className="card">
                    <p>
                      Hi <i>{sessionStorage.getItem("username")}</i>, add your
                      new post here:
                    </p>
                    <hr className="divider" />
                    <Textarea
                      name="title"
                      cols="50"
                      rows="1"
                      placeholder="Title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                    />
                    <Textarea
                      name="body"
                      cols="50"
                      rows="1"
                      placeholder="Content"
                      value={this.state.body}
                      onChange={this.handleInputChange}
                    />
                    <hr className="divider" />
                    <Textarea
                      name="tags"
                      cols="50"
                      rows="1"
                      placeholder="Tags: Song, Rap, Poem..."
                      value={this.state.tags}
                      onChange={this.handleInputChange}
                    />
                    <div className="options">
                      <div className="options__left">
                        <button
                          className="btn"
                          onClick={() => this.saveNewPost()}
                        >
                          Save
                        </button>
                      </div>
                      <div className="options__right">
                        <label>Private: </label>
                        <input
                          type="checkbox"
                          name="isPrivate"
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}
              <section className="cards">
                {this.state.posts.map(
                  (post) =>
                    (!post.isPrivate ||
                      post.userId === userId ||
                      post.collaborators.filter(
                        (collaborator) => collaborator.id === userId
                      ).length > 0) && (
                      <Link
                        to={{
                          pathname: `/post/${post._id}`,
                          state: {
                            postId: post._id,
                          },
                        }}
                        className="card post--summary"
                        key={post._id}
                      >
                        <Post post={post} />
                      </Link>
                    )
                )}
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
        <Footer
          message={"View on GitHub"}
          link={"https://github.com/ianbaxter/chat-wall"}
        />
      </div>
    );
  }
}

export default Home;
