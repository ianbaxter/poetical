import React, { useState } from "react";
import Textarea from "react-textarea-autosize";
import history from "../history";
import Options from "../components/Options";
import OptionPrivate from "../components/OptionPrivate";
import axios from "axios";

const EditPost = ({ post, updatePost }) => {
  const [newTitle, setNewTitle] = useState(post.title);
  const [newBody, setNewBody] = useState(post.body);
  const [newTags, setNewTags] = useState(post.tags.toString());
  const [newIsPrivate, setNewIsPrivate] = useState(post.isPrivate);

  const deletePost = () => {
    axios
      .delete(process.env.REACT_APP_BASE_URL + "/api/home/" + post._id)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log("Error deleting post: " + err);
      });
  };

  const saveEditedPost = (dateEdited) => {
    // Check if tags input field is empty
    let tagsArray = newTags === "" ? [] : newTags.split(",");
    const data = {
      title: newTitle,
      body: newBody,
      tags: tagsArray,
      dateEdited: new Date(),
      isPrivate: newIsPrivate,
    };

    axios
      .put(process.env.REACT_APP_BASE_URL + "/api/home/" + post._id, data)
      .then((res) => {
        let updatedPost = post;
        updatedPost.title = newTitle;
        updatedPost.body = newBody;
        updatedPost.tags = tagsArray;
        updatedPost.isPrivate = newIsPrivate;
        updatePost(updatedPost);
      })
      .catch((err) => {
        console.log("Error updating post: " + err);
      });
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "newTitle":
        setNewTitle(value);
        break;
      case "newBody":
        setNewBody(value);
        break;
      case "newTags":
        setNewTags(value);
        break;
      case "newIsPrivate":
        setNewIsPrivate(e.target.checked);
        break;
      default:
        return;
    }
  };

  return (
    <div className="card">
      <label htmlFor="newTitle">Title:</label>
      <Textarea
        name="newTitle"
        cols="50"
        rows="1"
        value={newTitle}
        onChange={handleInputChange}
      />
      <label htmlFor="newBody">Content:</label>
      <Textarea
        name="newBody"
        cols="50"
        rows="1"
        value={newBody}
        onChange={handleInputChange}
      />
      <hr className="divider" />
      <label htmlFor="newTags">Tags:</label>
      <Textarea
        name="newTags"
        cols="50"
        rows="1"
        placeholder="Enter Tags"
        value={newTags}
        onChange={handleInputChange}
      />
      <div className="margin-bottom">
        <OptionPrivate
          name="newIsPrivate"
          checked={newIsPrivate}
          handleOnChange={handleInputChange}
        />
      </div>
      <Options>
        <div className="options__left">
          <button
            className="btn btn--blue"
            onClick={() => saveEditedPost(post.date)}
          >
            Save
          </button>
        </div>
        <div className="options__right">
          <button className="btn btn--red" onClick={() => deletePost()}>
            Delete
          </button>
        </div>
      </Options>
    </div>
  );
};

export default EditPost;
