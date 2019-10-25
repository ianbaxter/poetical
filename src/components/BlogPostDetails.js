import React, { Component } from "react";
import { Link } from "react-router-dom";
import history from "../history";
import "../App.css";
import axios from "axios";
import Textarea from "react-textarea-autosize";

class BlogPostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
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
        this.setState({
          title: res.data.title,
          textBody: res.data.body,
          date: res.data.date
        });
      })
      .catch(err => console.log("Error from BlogPostDetails" + err));
  }

  onDeleteClick() {
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
    const data = {
      title: this.state.title,
      body: this.state.textBody,
      dateEdited: dateEdited
    };

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
    switch (event.target.name) {
      case "title":
        this.setState({ title: event.target.value });
        break;
      case "textBody":
        this.setState({ textBody: event.target.value });
        break;
      default:
        break;
    }
  };

  render() {
    const title = this.state.title;
    const textBody = this.state.textBody;
    const editMode = this.state.editMode;
    const date = this.state.date;

    if (!editMode) {
      return (
        <div>
          <div className="App-header">
            <Link to="/">
              <h1>My Blog</h1>
            </Link>
            <div className="navigation">
              <Link to="/login" className="btn">
                Login
              </Link>
            </div>
          </div>
          <div className="blog-posts">
            <div className="card-container">
              <h3>{title}</h3>
              <p>{textBody}</p>
              <div className="blog-post-options">
                <div>
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
              <Textarea
                name="title"
                cols="50"
                rows="1"
                value={this.state.title}
                onChange={this.handleTextEdit}
              />
              <Textarea
                name="textBody"
                cols="50"
                rows="1"
                value={this.state.textBody}
                onChange={this.handleTextEdit}
              />
              <div className="edit-options">
                <div className="safe-options">
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
                <div className="danger-options">
                  <button
                    className="btn btn-delete"
                    onClick={() => this.onDeleteClick()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default BlogPostDetails;
