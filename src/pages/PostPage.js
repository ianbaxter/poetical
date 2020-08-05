import React, { Component } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import EditPost from "../components/EditPost";
import StatusMessage from "../components/StatusMessage";
import PostCollabs from "../components/PostCollabs";
import Options from "../components/Options";
import Comment from "../components/Comment";

class PostPage extends Component {
  _isMounted = false;
  _isLoggedIn = sessionStorage.getItem("username");

  constructor(props) {
    super(props);
    this.state = {
      post: null,
      title: "",
      body: "",
      tags: [],
      isPrivate: false,
      editMode: false,
      collabMode: false,
      userCanEdit: false,
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (e) => {
      this.updateCurrentUserOnExit();
    });
    this._isMounted = true;
    this.getPost();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.updateCurrentUserOnExit();
  }

  updateCurrentUserOnExit() {
    if (this.state.post && this._isLoggedIn === this.state.post.currentUser) {
      const data = {
        currentUser: "",
      };
      axios
        .put(
          process.env.REACT_APP_BASE_URL + "/api/home/" + this.state.post._id,
          data
        )
        .catch((err) => {
          console.log("Error updating post: " + err);
        });
    }
  }

  getPost() {
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          "/api/home/" +
          this.props.location.state.postId
      )
      .then((res) => {
        if (this._isMounted) {
          let userCanEdit = false;
          if (res.data.userId === sessionStorage.getItem("userId"))
            userCanEdit = true;
          res.data.collaborators.forEach((collaborator) => {
            if (collaborator.id === sessionStorage.getItem("userId"))
              userCanEdit = true;
          });

          this.setState({
            post: res.data,
            title: res.data.title,
            body: res.data.body,
            tags: res.data.tags,
            isPrivate: res.data.isPrivate,
            userCanEdit,
          });
        }
      })
      .catch((err) => console.log("Error getting post: " + err));
  }

  toggleEditMode() {
    if (!this.state.post.currentUser) {
      this.updateCurrentUser(this._isLoggedIn, true);
    }
  }

  updateCurrentUser(currentUser, editMode) {
    const data = {
      currentUser,
    };
    axios
      .put(
        process.env.REACT_APP_BASE_URL + "/api/home/" + this.state.post._id,
        data
      )
      .then((res) => {
        let updatedPost = this.state.post;
        updatedPost.currentUser = currentUser;
        this.setState({ post: updatedPost, editMode });
      })
      .catch((err) => {
        console.log("Error accessing editmode: " + err);
      });
  }

  updatePost = (updatedPost) => {
    this.setState({ post: updatedPost, editMode: false });
  };

  toggleColabMode() {
    this.setState({ collabMode: true });
  }

  cancel(mode) {
    switch (mode) {
      case "edit":
        this.updateCurrentUser("", false);
        break;
      case "collab":
        this.setState({ collabMode: false });
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Header isLoggedIn={this._isLoggedIn} />
        {!this.state.editMode &&
          !this.state.collabMode &&
          (this.state.post === null ? (
            <StatusMessage
              message={"Loading Post . . ."}
              animation={"animate-flicker"}
            />
          ) : (
            <main className="cards">
              <div className="card">
                <Post post={this.state.post} />
              </div>
              {this.state.userCanEdit && (
                <div className="card-width-wrapper margin-bottom">
                  {this.state.post.currentUser ? (
                    <p className="font--secondary-color">
                      {"Currently being edited by: " +
                        this.state.post.currentUser}
                    </p>
                  ) : (
                    <Options>
                      <div className="options__left">
                        <button
                          className="btn small-screen-margin-bottom"
                          onClick={() => this.toggleEditMode()}
                        >
                          Edit
                        </button>
                      </div>
                      <div className="options__right">
                        <button
                          className="btn btn--wide"
                          onClick={() => this.toggleColabMode()}
                        >
                          Manage Collaborators
                        </button>
                      </div>
                    </Options>
                  )}
                </div>
              )}
              <Comment
                post={this.state.post}
                isLoggedIn={this._isLoggedIn}
                getPost={() => this.getPost()}
              />
            </main>
          ))}
        {this.state.editMode && (
          <main className="cards">
            <EditPost post={this.state.post} updatePost={this.updatePost} />
            <div className="card-width-wrapper">
              <Options>
                <button className="btn" onClick={() => this.cancel("edit")}>
                  Cancel
                </button>
              </Options>
            </div>
          </main>
        )}
        {this.state.collabMode && (
          <main className="cards">
            <PostCollabs post={this.state.post} />
            <div className="card-width-wrapper">
              <Options>
                <button className="btn " onClick={() => this.cancel("collab")}>
                  Back
                </button>
              </Options>
            </div>
          </main>
        )}
        {this.state.post && <Footer />}
      </div>
    );
  }
}

export default PostPage;
