import React, { useState } from "react";
import history from "../history";
import Options from "../components/Options";
import OptionPrivate from "../components/OptionPrivate";
import axios from "axios";

const EditPost = ({ post, updatePost }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [tags, setTags] = useState(post.tags.toString());
  const [isPrivate, setIsPrivate] = useState(post.isPrivate);

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
    let tagsArray = tags === "" ? [] : tags.split(",");
    const data = {
      title,
      body,
      tags: tagsArray,
      dateEdited: new Date(),
      isPrivate,
      currentUser: "",
    };

    axios
      .put(process.env.REACT_APP_BASE_URL + "/api/home/" + post._id, data)
      .then((res) => {
        let updatedPost = post;
        updatedPost.title = title;
        updatedPost.body = body;
        updatedPost.tags = tagsArray;
        updatedPost.isPrivate = isPrivate;
        updatedPost.currentUser = "";
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
      case "title":
        setTitle(value);
        break;
      case "body":
        setBody(value);
        break;
      case "tags":
        setTags(value);
        break;
      case "isPrivate":
        setIsPrivate(e.target.checked);
        break;
      default:
        return;
    }
  };

  return (
    <div className="card">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        cols="50"
        rows="1"
        value={title}
        onChange={handleInputChange}
      />
      <label htmlFor="body">Content:</label>
      <textarea
        name="body"
        id="body"
        cols="50"
        rows="3"
        value={body}
        onChange={handleInputChange}
      />
      <hr className="divider" />
      <label htmlFor="tags">Tags:</label>
      <input
        type="text"
        name="tags"
        id="tags"
        cols="50"
        rows="1"
        placeholder="Enter Tags"
        value={tags}
        onChange={handleInputChange}
      />
      <div className="margin-bottom">
        <OptionPrivate
          name="newIsPrivate"
          checked={isPrivate}
          handleOnChange={handleInputChange}
        />
      </div>
      <Options>
        <div className="options__left">
          <button className="btn" onClick={() => saveEditedPost(post.date)}>
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
