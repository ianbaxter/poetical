import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import timeSince from "../utils/time";

const Comment = ({ post, isLoggedIn, getPost }) => {
  const [comment, setComment] = useState("");

  const saveComment = () => {
    if (comment === "") return;
    const data = {
      body: comment,
      username: sessionStorage.getItem("username"),
      parentId: post._id,
    };

    axios
      .post(process.env.REACT_APP_BASE_URL + "/api/home/" + post._id, data)
      .then((res) => {
        setComment("");
        getPost();
      })
      .catch((err) => console.error("Eror saving comment: " + err));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  return (
    <section className="card">
      <h5>Comments:</h5>
      {post.comments.length === 0 ? (
        <div>
          <hr></hr>
          <p className="font--secondary-color">No comments</p>
        </div>
      ) : (
        post.comments.reverse().map((comment) => (
          <div key={comment._id}>
            <hr></hr>
            <p>{comment.body}</p>
            <div className="post__details">
              <div className="post__details-row">
                <label>Author:</label>
                <p>{comment.username}</p>
              </div>
              <div className="post__details-row">
                <label>Posted:</label>
                <p>{timeSince(new Date(comment.date)) + " ago"}</p>
              </div>
            </div>
          </div>
        ))
      )}
      {isLoggedIn ? (
        <div>
          <hr></hr>
          <label htmlFor="comment">New comment:</label>
          <textarea
            name="comment"
            id="comment"
            cols="50"
            rows="2"
            value={comment}
            onChange={handleInputChange}
          ></textarea>
          <button className="btn" onClick={saveComment}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <hr></hr>
          <Link to="/login" className="btn btn--wide">
            Login to comment
          </Link>
        </div>
      )}
    </section>
  );
};

export default Comment;
