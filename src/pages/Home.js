import React, { Component, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import history from "../history";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewPost from "../components/NewPost";
import StatusMessage from "../components/StatusMessage";
import Options from "../components/Options";
import ErrorBoundary from "../components/ErrorBoundary";
import axios from "axios";

const Post = lazy(() => import("../components/Post"));

class Home extends Component {
  _isMounted = false;
  _isLoggedIn = sessionStorage.getItem("username");
  userId = sessionStorage.getItem("userId");

  constructor(props) {
    super(props);
    this.state = {
      posts: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getPosts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getPosts() {
    let data;
    if (window.location.search) {
      if (window.location.search.includes("tag")) {
        data = {
          params: {
            tag: new URL(window.location.href).searchParams.get("tag"),
          },
        };
      } else if (window.location.search.includes("username")) {
        data = {
          params: {
            username: new URL(window.location.href).searchParams.get(
              "username"
            ),
          },
        };
      }
    }

    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/home", data)
      .then((res) => {
        if (this._isMounted) {
          let postsReversed = res.data.reverse();
          let numPosts = Object.keys(postsReversed).length;
          numPosts > 0
            ? this.setState({ posts: postsReversed })
            : this.setState({ posts: "Empty" });
        }
      })
      .catch((err) => {
        console.error("Error from posts: " + err);
      });
  }

  setPosts = (posts) => {
    this.setState({ posts });
  };

  clearFilter() {
    history.push("/");
    this.getPosts();
  }

  render() {
    return (
      <div className="wrapper">
        <Header isLoggedIn={this._isLoggedIn} />
        <main>
          <section className="cards">
            {this._isLoggedIn ? (
              <NewPost getPosts={() => this.getPosts()} />
            ) : (
              <div className="card card--intro">
                <h1>P</h1>
                <h2>
                  Poetical is a platform for collaborating on creative prose
                </h2>
                <p>
                  Register to start posting or browse others creations below.
                </p>
                <Link to="/register" className="btn">
                  Register
                </Link>
              </div>
            )}
          </section>
          {this.state.posts === null ? (
            <StatusMessage
              message={"Loading Posts . . ."}
              animation={"animate-flicker"}
            />
          ) : this.state.posts === "Empty" ? (
            <StatusMessage message={"There are no posts"} />
          ) : (
            <Suspense
              fallback={
                <StatusMessage
                  message={"Loading Posts . . ."}
                  animation={"animate-flicker"}
                />
              }
            >
              <ErrorBoundary
                fallback={<StatusMessage message={"Something went wrong"} />}
              >
                <section className="cards">
                  {window.location.search && (
                    <div className="card-width-wrapper">
                      <hr className="divider" />
                      <Options>
                        <div className="options__left">
                          <h5>
                            {window.location.search.includes("tag")
                              ? "Showing posts tagged as: " +
                                new URL(window.location.href).searchParams.get(
                                  "tag"
                                )
                              : "Showing posts by: " +
                                new URL(window.location.href).searchParams.get(
                                  "username"
                                )}
                          </h5>
                        </div>
                        <div className="options__right">
                          <button
                            className="btn btn--red"
                            onClick={() => this.clearFilter()}
                          >
                            Clear
                          </button>
                        </div>
                      </Options>
                    </div>
                  )}
                  {this.state.posts.map(
                    (post) =>
                      (!post.isPrivate ||
                        post.userId === this.userId ||
                        post.collaborators.filter(
                          (collaborator) => collaborator.id === this.userId
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
                          aria-label={post.title}
                        >
                          <Post post={post} setPosts={this.setPosts} />
                        </Link>
                      )
                  )}
                  <a href="#top" aria-label="Go to top of page">
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
              </ErrorBoundary>
            </Suspense>
          )}
        </main>
        {this.state.posts && (
          <Footer>
            <a href="https://github.com/ianbaxter/chat-wall">View on GitHub</a>
          </Footer>
        )}
      </div>
    );
  }
}

export default Home;
