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
      id: this.props.match.params.id,
      post: null,
    };
  }

  UNSAFE_componentWillMount() {
    const { post } = this.props.location.state;

    this.setState({
      title: post.title,
      body: post.body,
      post,
    });
  }

  componentDidMount() {
    sessionStorage.getItem("username")
      ? (this._isLoggedIn = true)
      : (this._isLoggedIn = false);
  }

  onDeleteClick() {
    axios
      .delete(process.env.REACT_APP_BASE_URL + "/api/blogHome/" + this.state.id)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log("Error deleting blog post: " + err);
      });
  }

  onEditClick() {
    this.setState({ editMode: true });
  }

  onCancelClick() {
    this.setState({
      editMode: false,
      newTitle: this.state.title,
      newTextBody: this.state.body,
    });
  }

  onSaveEditClick(dateEdited) {
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
        this.setState({
          editMode: false,
          title: this.state.newTitle,
          textBody: this.state.newBody,
        });
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
    const editMode = this.state.editMode;
    const date = this.state.post.date;

    return (
      <div className="wrapper">
        <Header isLoggedIn={this._isLoggedIn} />
        {!editMode && (
          <main className="cards">
            <div className="card">
              <Post
                id={this.state.id}
                title={this.state.title}
                body={this.state.body}
                date={this.state.post.date}
                username={this.state.post.username}
                favs={this.state.post.meta.favs}
              />
            </div>
            {this._isLoggedIn && (
              <div className="post-options">
                <button
                  className="btn btn--edit"
                  onClick={() => this.onEditClick()}
                >
                  Edit
                </button>
              </div>
            )}
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
                name="newTextBody"
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
                  onClick={() => this.onSaveEditClick(date)}
                >
                  Save
                </button>
                <button
                  className="btn btn--cancel"
                  onClick={() => this.onCancelClick()}
                >
                  Cancel
                </button>
              </div>
              <div className="post-options__danger">
                <button
                  className="btn btn--delete"
                  onClick={() => this.onDeleteClick()}
                >
                  Delete
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
