import React, { Component } from "react";
import history from "../history";
import "../App.css";
import axios from "axios";
import Header from "../components/Header";
import Post from "../components/Post";
import PostStatus from "../components/PostStatus";
import Textarea from "react-textarea-autosize";

class PostPage extends Component {
  constructor(props) {
    super(props);
    this._isLoggedIn = sessionStorage.getItem("username");
    this.postId = this.props.location.state.postId;
    this.state = {
      post: null,
      title: "",
      body: "",
      newTitle: "",
      newBody: "",
      editMode: false,
      addCollabMode: false,
      collaborator: "",
      userCanEdit: false,
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/blogHome/" + this.postId)
      .then((res) => {
        const post = res.data;
        const userCanEdit = this.authUser(post);

        this.setState({
          post,
          title: res.data.title,
          body: res.data.body,
          newTitle: res.data.title,
          newBody: res.data.body,
          userCanEdit,
        });
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

  edit() {
    this.setState({ editMode: true });
  }

  toggleColabMode() {
    this.setState({ addCollabMode: true });
  }

  delete() {
    axios
      .delete(
        process.env.REACT_APP_BASE_URL + "/api/blogHome/" + this.state.post._id
      )
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log("Error deleting blog post: " + err);
      });
  }

  cancel(mode) {
    switch (mode) {
      case "edit":
        this.setState({
          editMode: false,
          newTitle: this.state.title,
          newBody: this.state.body,
        });
        break;
      case "addCollab":
        this.setState({ addCollabMode: false });
        break;
      default:
        return;
    }
  }

  save(dateEdited) {
    const data = {
      title: this.state.newTitle,
      body: this.state.newBody,
      dateEdited: dateEdited,
    };

    axios
      .put(
        process.env.REACT_APP_BASE_URL + "/api/blogHome/" + this.state.post._id,
        data
      )
      .then((res) => {
        let updatedPost = this.state.post;
        updatedPost.title = this.state.newTitle;
        updatedPost.body = this.state.newBody;
        this.setState({
          editMode: false,
          title: this.state.newTitle,
          body: this.state.newBody,
          post: updatedPost,
        });
      })
      .catch((err) => {
        console.log("Error updating blog post: " + err);
      });
  }

  addCollaborator() {
    if (this.state.collaborator === "") return;

    let collaborators = this.state.post.collaborators;
    collaborators.forEach((collaborator) => {
      if (collaborator.username === this.state.collaborator) {
        console.log("User is already a collaborator");
        return;
      } else {
        // Check if new collaborator is a user and if so return their ID
        const data = { username: this.state.collaborator };
        axios
          .get(process.env.REACT_APP_BASE_URL + "/api/users", {
            params: data,
          })
          .then((res) => {
            console.log("Adding new collaborator");
            const collaboratorId = res.data;
            const newCollaborator = {
              id: collaboratorId,
              username: this.state.collaborator,
            };
            collaborators.push(newCollaborator);

            const data = { collaborators };
            axios
              .put(
                process.env.REACT_APP_BASE_URL +
                  "/api/blogHome/" +
                  this.state.post._id,
                data
              )
              .then((res) => {
                this.setState({ collaborator: "" });
              })
              .catch((err) => {
                console.log("Error updating blog post: " + err);
              });
          })
          .catch((err) => console.log("This user does not exist: " + err));
      }
    });
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
          process.env.REACT_APP_BASE_URL +
            "/api/blogHome/" +
            this.state.post._id,
          data
        )
        .then((res) => {
          this.setState({ collaborator: "" });
        })
        .catch((err) => {
          console.log("Error updating blog post: " + err);
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
    const addCollabMode = this.state.addCollabMode;

    return (
      <div className="wrapper">
        <Header isLoggedIn={this._isLoggedIn} />
        {!editMode &&
          !addCollabMode &&
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
                <div className="options">
                  <div className="options__safe">
                    <button
                      className="btn btn--edit"
                      onClick={() => this.edit()}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="options__danger">
                    <button
                      className="btn btn--collaborate"
                      onClick={() => this.toggleColabMode()}
                    >
                      Manage Collaborators
                    </button>
                  </div>
                </div>
              )}
            </main>
          ))}
        {editMode && (
          <main className="cards">
            <div className="card">
              <label for="newTitle">Title:</label>
              <Textarea
                name="newTitle"
                cols="50"
                rows="1"
                value={this.state.newTitle}
                onChange={this.handleInputChange}
              />
              <label for="newBody">Content:</label>
              <Textarea
                name="newBody"
                cols="50"
                rows="1"
                value={this.state.newBody}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="options">
              <div className="options__safe">
                <button
                  className="btn"
                  onClick={() => this.save(this.state.post.date)}
                >
                  Save
                </button>
                <button
                  className="btn btn--cancel"
                  onClick={() => this.cancel("edit")}
                >
                  Cancel
                </button>
              </div>
              <div className="options__danger">
                <button
                  className="btn btn--danger"
                  onClick={() => this.delete()}
                >
                  Delete
                </button>
              </div>
            </div>
          </main>
        )}
        {addCollabMode && (
          <main className="cards">
            <div className="card">
              <div>
                <h6>Collaborators:</h6>
                <div>
                  {this.state.post.collaborators.length > 0 ? (
                    this.state.post.collaborators.map((collaborator) => (
                      <p key={collaborator.id}>{collaborator.username}</p>
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
                  placeholder="Enter Username"
                  value={this.state.collaborator}
                  onChange={this.handleInputChange}
                />
                <div className="options options--collab">
                  <div className="options__safe">
                    <button
                      className="btn"
                      onClick={() => this.addCollaborator()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="options__danger">
                    <button
                      className="btn btn--danger btn--remove"
                      onClick={() => this.removeCollaborator()}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="options">
              <div className="options__safe">
                <button
                  className="btn "
                  onClick={() => this.cancel("addCollab")}
                >
                  Back
                </button>
              </div>
            </div>
          </main>
        )}
      </div>
    );
  }
}

export default PostPage;
