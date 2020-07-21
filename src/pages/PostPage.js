import React, { Component } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Post from "../components/Post";
import EditPost from "../components/EditPost";
import PostStatus from "../components/PostStatus";
import Options from "../components/Options";
import Textarea from "react-textarea-autosize";

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
      collaborator: "",
      editMode: false,
      collabMode: false,
      userCanEdit: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getPost();
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

  componentWillUnmount() {
    this._isMounted = false;
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
        this.setState({ collabMode: false, collaborator: "" });
        break;
      default:
        return;
    }
  }

  addCollaborator() {
    if (this.state.collaborator === "") return;
    if (this.state.collaborator === sessionStorage.getItem("username"))
      return console.log("Cannot add yourself as a collaborator");

    let collaborators = this.state.post.collaborators;

    // Check if already a collaborator
    if (
      collaborators.length > 0 &&
      collaborators.filter(
        (collaborator) => collaborator.username === this.state.collaborator
      ).length > 0
    ) {
      console.log("User is already a collaborator");
      return;
    }

    // Check if new collaborator is a user and if so return their ID
    const data = { username: this.state.collaborator };
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/users", {
        params: data,
      })
      .then((res) => {
        const collaboratorId = res.data;
        const newCollaborator = {
          id: collaboratorId,
          username: this.state.collaborator,
        };
        collaborators.push(newCollaborator);

        const data = { collaborators };
        axios
          .put(
            process.env.REACT_APP_BASE_URL + "/api/home/" + this.state.post._id,
            data
          )
          .then((res) => {
            console.log("Added new collaborator: " + this.state.collaborator);
            this.setState({ collaborator: "" });
          })
          .catch((err) => {
            console.log("Error updating post: " + err);
          });
      })
      .catch((err) => console.log("This user does not exist: " + err));
  }

  removeCollaborator() {
    if (this.state.collaborator === "") return;
    let collaborators = this.state.post.collaborators;
    let collaboratorIndex = -1;
    collaborators.forEach((collaborator, index) => {
      if (collaborator.username === this.state.collaborator)
        collaboratorIndex = index;
    });

    if (collaboratorIndex >= 0) {
      console.log("Remove collaborator");

      collaborators.splice(collaboratorIndex, 1);

      const data = { collaborators };
      axios
        .put(
          process.env.REACT_APP_BASE_URL + "/api/home/" + this.state.post._id,
          data
        )
        .then((res) => {
          this.setState({ collaborator: "" });
        })
        .catch((err) => {
          console.log("Error updating post: " + err);
        });
    }
    return;
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

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
            <div className="card">
              <div>
                <h6>Collaborators:</h6>
                <div>
                  {this.state.post.collaborators.length > 0 ? (
                    this.state.post.collaborators.map((collaborator) => (
                      <li key={collaborator.id}>{collaborator.username}</li>
                    ))
                  ) : (
                    <p className="p--secondary">No Collaborators</p>
                  )}
                </div>
              </div>
              <hr className="divider" />
              <div>
                <Textarea
                  name="collaborator"
                  cols="50"
                  rows="1"
                  placeholder="Enter Username (Case Sensitive)"
                  value={this.state.collaborator}
                  onChange={this.handleInputChange}
                />
                <Options>
                  <div className="options__left">
                    <button
                      className="btn btn--blue"
                      onClick={() => this.addCollaborator()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="options__right">
                    <button
                      className="btn btn--red"
                      onClick={() => this.removeCollaborator()}
                    >
                      Remove
                    </button>
                  </div>
                </Options>
              </div>
            </div>
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
