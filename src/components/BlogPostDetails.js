import React, { useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import history from "../history";
import "../App.css";
import axios from "axios";

class BlogPostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textBody: "",
      date: "",
      editMode: false,
      id: this.props.match.params.id
    };
  }

  componentDidMount() {
    console.log("Mounted with ID: " + this.state.id);
    axios
      .get("http://localhost:8000/api/blogHome/" + this.state.id)
      .then(res => {
        this.setState({ textBody: res.data.body, date: res.data.date });
      })
      .catch(err => console.log("Error from BlogPostDetails" + err));
  }

  onDeleteClick() {
    console.log("delete clicked");
    axios
      .delete("http://localhost:8000/api/blogHome/" + this.state.id)
      .then(res => {
        history.push("/");
      })
      .catch(err => {
        console.log("Error deleting blog post: " + err);
      });
  }

  onEditClick() {
    this.setState({ editMode: true });
  }

  onCancelClick() {
    this.setState({ editMode: false });
  }

  onSaveEditClick(dateEdited) {
    console.log("Save edit clicked");

    const data = { body: this.state.textBody, dateEdited: dateEdited };

    axios
      .put("http://localhost:8000/api/blogHome/" + this.state.id, data)
      .then(res => {
        this.setState({ editMode: false });
      })
      .catch(err => {
        console.log("Error updating blog post: " + err);
      });
  }

  handleTextEdit = event => {
    console.log(event.target.value);
    this.setState({ textBody: event.target.value });
  };

  render() {
    const date = this.state.date;
    const editMode = this.state.editMode;
    const textBody = this.state.textBody;

    if (!editMode) {
      return (
        <div>
          <div className="App-header">
            <h1>My Blog</h1>
            <div className="navigation">
              <Link to="/login" className="btn">
                Login
              </Link>
            </div>
          </div>
          <div className="blog-posts">
            <div className="card-container">
              <p>{textBody}</p>
              <div className="blog-post-options">
                <div>
                  <button
                    className="btn btn-delete"
                    onClick={() => this.onDeleteClick()}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-edit"
                    onClick={() => this.onEditClick()}
                  >
                    Edit
                  </button>
                </div>
                <div id="post-date">
                  <span>{"Posted: " + new Date(date).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="App-header">
            <h1>My Blog</h1>
            <div className="navigation">
              <Link to="/login" className="btn">
                Login
              </Link>
            </div>
          </div>
          <div className="blog-posts">
            <div className="card-container">
              <textarea
                name="body"
                cols="50"
                rows="1"
                value={this.state.textBody}
                onChange={this.handleTextEdit}
              />
              <div>
                <button
                  className="btn btn-delete"
                  onClick={() => this.onSaveEditClick(date)}
                >
                  Save
                </button>
                <button
                  className="btn btn-edit"
                  onClick={() => this.onCancelClick()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BlogPostDetails;
