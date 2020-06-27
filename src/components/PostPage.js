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
      id: this.props.match.params.id,
      post: null,
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

  addCollaborator() {
    console.log("Add collaborator");
    this.setState({ addCollabMode: true });
  }

  delete() {
    axios
      .delete(process.env.REACT_APP_BASE_URL + "/api/blogHome/" + this.state.id)
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
        process.env.REACT_APP_BASE_URL + "/api/blogHome/" + this.state.id,
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
              <div className="post-options">
                <div className="post-options__safe">
                  <button className="btn btn--edit" onClick={() => this.edit()}>
                    Edit
                  </button>
                </div>
                <div className="post-options__danger">
                  <button
                    className="btn btn--collaborate"
                    onClick={() => this.addCollaborator()}
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
            <div className="post-options">
              <div className="post-options__safe">
                <button
                  className="btn btn-save"
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
              <div className="post-options__danger">
                <button
                  className="btn btn--delete"
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
            <div className="card"></div>
            <div className="post-options">
              <div className="post-options__safe">
                <button
                  className="btn btn-save"
                  onClick={() => this.save(this.state.post.date)}
                >
                  Save
                </button>
              </div>
              <div className="post-options__danger">
                <button
                  className="btn btn--cancel"
                  onClick={() => this.cancel("addCollab")}
                >
                  Cancel
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
