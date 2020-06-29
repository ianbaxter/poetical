import React, { Component } from "react";
import history from "../history";
import "../App.css";
import axios from "axios";
import Header from "./Header";
import Post from "./Post";
import Textarea from "react-textarea-autosize";

class PostPage extends Component {
  constructor(props) {
    super(props);
    this._isLoggedIn = false;
    this.state = {
      title: "",
      body: "",
      newTitle: "",
      newBody: "",
      editMode: false,
      addCollabMode: false,
      post: null,
      collaborator: "",
    };
  }

  UNSAFE_componentWillMount() {
    const { post } = this.props.location.state;

    this.setState({
      title: post.title,
      body: post.body,
      newTitle: post.title,
      newBody: post.body,
      post,
    });
  }

  componentDidMount() {
    if (sessionStorage.getItem("username"))
      this.setState({ _isLoggedIn: true });
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
    if (collaborators.usernames.includes(this.state.collaborator)) {
      console.log("User is already a collaborator");
      return;
    }

    console.log("Adding new collaborator");
    // Get new collaborator's id
    // collaborators.ids.push();
    collaborators.usernames.push(this.state.collaborator);

    const data = { collaborators };
    axios
      .put(
        process.env.REACT_APP_BASE_URL + "/api/blogHome/" + this.state.post._id,
        data
      )
      .then((res) => {
        this.setState({ collaborator: "" });
      })
      .catch((err) => {
        console.log("Error updating blog post: " + err);
      });
  }

  // addCollaborator() {
  //   if (this.state.collaborator === "") return;
  //   // Check if collaborator is a user
  //   const params = { params: this.state.collaborator };
  //   axios
  //     .get(process.env.REACT_APP_BASE_URL + "/api/users", {
  //       params: this.state.collaborator,
  //     })
  //     .then(() => {
  //       let collaborators = this.state.post.collaborators;
  //       if (collaborators.usernames.includes(this.state.collaborator)) {
  //         console.log("User is already a collaborator");
  //         return;
  //       }

  //       console.log("Adding new collaborator");
  //       // Get new collaborator's id
  //       // collaborators.ids.push();
  //       collaborators.usernames.push(this.state.collaborator);

  //       const data = { collaborators };
  //       axios
  //         .put(
  //           process.env.REACT_APP_BASE_URL +
  //             "/api/blogHome/" +
  //             this.state.post._id,
  //           data
  //         )
  //         .then((res) => {
  //           this.setState({ collaborator: "" });
  //         })
  //         .catch((err) => {
  //           console.log("Error updating blog post: " + err);
  //         });
  //     })
  //     .catch((err) => console.log("Error checking user: " + err));
  // }

  removeCollaborator() {
    if (this.state.collaborator === "") return;
    let collaborators = this.state.post.collaborators;
    let collaboratorIndex = collaborators.usernames.indexOf(
      this.state.collaborator
    );
    if (collaboratorIndex >= 0) {
      console.log("Remove collaborator");

      collaborators.usernames.splice(collaboratorIndex, 1);

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

    let userId = sessionStorage.getItem("userId");

    return (
      <div className="wrapper">
        <Header isLoggedIn={this.state._isLoggedIn} />
        {!editMode && !addCollabMode && (
          <main className="cards">
            <div className="card">
              <Post post={this.state.post} />
            </div>
            {this.state.post.userId === userId ||
            this.state.post.collaborators.ids.includes(userId) ? (
              <div className="options">
                <div className="options__safe">
                  <button className="btn btn--edit" onClick={() => this.edit()}>
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
            ) : null}
          </main>
        )}
        {editMode && (
          <main className="cards">
            <div className="card">
              <Textarea
                name="newTitle"
                cols="50"
                rows="1"
                value={this.state.newTitle}
                onChange={this.handleInputChange}
              />
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
                  {this.state.post.collaborators.usernames.length > 0 ? (
                    this.state.post.collaborators.usernames.map((username) => (
                      <p>{username}</p>
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
