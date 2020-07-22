import React, { Component } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import EditPost from "../components/EditPost";
import PostStatus from "../components/PostStatus";
import PostCollabs from "../components/PostCollabs";
import Options from "../components/Options";

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
    this._isMounted = true;
    this.getPost();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
          const post = res.data;
          const userCanEdit = this.authUser(post);

          this.setState({
            post,
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

  authUser(post) {
    const userId = sessionStorage.getItem("userId");
    let userCanEdit = false;
    if (post.userId === userId) userCanEdit = true;
    post.collaborators.forEach((collaborator) => {
      if (collaborator.id === userId) userCanEdit = true;
    });
    return userCanEdit;
  }

  toggleEditMode() {
    this.setState({ editMode: true });
  }

  toggleColabMode() {
    this.setState({ collabMode: true });
  }

  updatePost = (updatedPost) => {
    this.setState({ post: updatedPost, editMode: false });
  };

  cancel(mode) {
    switch (mode) {
      case "edit":
        this.setState({ editMode: false });
        break;
      case "collab":
        this.setState({ collabMode: false });
        break;
      default:
        return;
    }
  }

  render() {
    const editMode = this.state.editMode;
    const collabMode = this.state.collabMode;

    return (
      <div className="wrapper">
        <Header isLoggedIn={this._isLoggedIn} />
        {!editMode &&
          !collabMode &&
          (this.state.post === null ? (
            <main className="cards main--loading">
              <PostStatus
                message={"Loading Posts . . ."}
                animation={"animate-flicker"}
              />
            </main>
          ) : (
            <main className="cards">
              <div className="card">
                <Post post={this.state.post} />
              </div>
              {this.state.userCanEdit && (
                <div className="options-nav-wrapper">
                  <Options>
                    <div className="options__left">
                      <button
                        className="btn"
                        onClick={() => this.toggleEditMode()}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="options__right">
                      <button
                        className="btn btn--collaborate"
                        onClick={() => this.toggleColabMode()}
                      >
                        Manage Collaborators
                      </button>
                    </div>
                  </Options>
                </div>
              )}
            </main>
          ))}
        {editMode && (
          <main className="cards">
            <EditPost post={this.state.post} updatePost={this.updatePost} />
            <div className="options-nav-wrapper">
              <Options>
                <button className="btn" onClick={() => this.cancel("edit")}>
                  Cancel
                </button>
              </Options>
            </div>
          </main>
        )}
        {collabMode && (
          <main className="cards">
            <PostCollabs post={this.state.post} />
            <div className="options-nav-wrapper">
              <Options>
                <button className="btn " onClick={() => this.cancel("collab")}>
                  Back
                </button>
              </Options>
            </div>
          </main>
        )}
        <Footer />
      </div>
    );
  }
}

export default PostPage;
