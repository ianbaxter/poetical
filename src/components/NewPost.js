import React, { useState } from "react";
import Options from "../components/Options";
import OptionPrivate from "../components/OptionPrivate";
import axios from "axios";

const NewPost = ({ getPosts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const saveNewPost = () => {
    let tagsArray = [];
    if (tags !== "") tagsArray = tags.split(",");
    const data = {
      title,
      body,
      username: sessionStorage.getItem("username"),
      userId: sessionStorage.getItem("userId"),
      tags: tagsArray,
      isPrivate,
    };
    axios
      .post(process.env.REACT_APP_BASE_URL + "/api/home", data)
      .then((res) => {
        setTitle("");
        setBody("");
        setTags("");
        setIsPrivate(false);
        getPosts();
      })
      .catch((err) => {
        console.error("Error saving new post: " + err);
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
      <p>
        Hi <i>{sessionStorage.getItem("username")}</i>, add your new post here:
      </p>
      <hr className="divider" />
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        cols="50"
        rows="1"
        placeholder="Title..."
        value={title}
        onChange={handleInputChange}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        name="body"
        id="content"
        cols="50"
        rows="3"
        placeholder="Content..."
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
        placeholder="Song, Rap, Poem, Haiku..."
        value={tags}
        onChange={handleInputChange}
      />
      <Options>
        <div className="options__left">
          <button className="btn" onClick={() => saveNewPost()}>
            Save
          </button>
        </div>
        <OptionPrivate
          className="options__right"
          name="isPrivate"
          checked={isPrivate}
          handleOnChange={handleInputChange}
        />
      </Options>
    </div>
  );
};

export default NewPost;
