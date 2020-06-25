import React, { Component } from "react";
import history from "../history";
import "../App.css";
import axios from "axios";
import Header from "./Header";
import Textarea from "react-textarea-autosize";

class BlogPostDetails extends Component {
  constructor(props) {
    super(props);
    this._isLoggedIn = false;
    this.state = {
      title: "",
      textBody: "",
      newTitle: "",
      newTextBody: "",
      date: "",
      editMode: false,
      id: this.props.match.params.id,
      username: "",
    };
  }

  componentDidMount() {
    sessionStorage.getItem("username")
      ? (this._isLoggedIn = true)
      : (this._isLoggedIn = false);
    this.getBlogPostDetails();
  }

  getBlogPostDetails() {
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/blogHome/" + this.state.id)
      .then((res) => {
        this.setState({
          title: res.data.title,
          textBody: res.data.body,
          newTitle: res.data.title,
          newTextBody: res.data.body,
          date: res.data.date,
          username: res.data.username,
        });
      })
      .catch((err) => console.log("Error from BlogPostDetails" + err));
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
      newTextBody: this.state.textBody,
    });
  }

  onSaveEditClick(dateEdited) {
    const data = {
      title: this.state.newTitle,
      body: this.state.newTextBody,
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
          textBody: this.state.newTextBody,
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
    const title = this.state.title;
    const textBody = this.state.textBody;
    const editMode = this.state.editMode;
    const date = this.state.date;
    const username = this.state.username;

    return (
      <div>
        <Header isLoggedIn={this._isLoggedIn} />
        <main className="cards">
          {!editMode && (
            <article className="card">
              <h3>{title}</h3>
              <p>{textBody}</p>
              <div className="post__details">
                <div>
                  <button
                    className="btn btn-edit"
                    onClick={() => this.onEditClick()}
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <div>
                    <span>{"Posted: " + new Date(date).toLocaleString()}</span>
                  </div>
                  <div>
                    <span>Author: {username ? username : "Anonymous"}</span>
                  </div>
                </div>
              </div>
            </article>
          )}
          {editMode && (
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
                value={this.state.newTextBody}
                onChange={this.handleInputChange}
              />
              <div className="post-options">
                <div className="post-options__safe">
                  <button
                    className="btn btn-save"
                    onClick={() => this.onSaveEditClick(date)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => this.onCancelClick()}
                  >
                    Cancel
                  </button>
                </div>
                <div className="post-options__danger">
                  <button
                    className="btn btn-delete"
                    onClick={() => this.onDeleteClick()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default BlogPostDetails;
