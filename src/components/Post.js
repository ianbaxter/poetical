import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Post = ({ id, title, body, date, username, favs }) => {
  const [postFavs, setPostFavs] = useState(favs);

  const toggleFavourite = (e) => {
    e.preventDefault();
    let newFavs = postFavs + 1;
    const data = {
      meta: { favs: newFavs },
    };

    axios
      .put(process.env.REACT_APP_BASE_URL + "/api/blogHome/" + id, data)
      .then((res) => {
        console.log("Post favourited");
        setPostFavs(newFavs);
      })
      .catch((err) => {
        console.log("Error updating blog post: " + err);
      });
  };

  return (
    <article className="post">
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="post__details">
        <div>
          <p>{"Posted: " + new Date(date).toLocaleString()}</p>
        </div>
        <div>
          <p>Author: {username ? username : "Anonymous"}</p>
        </div>
      </div>
      <div className="post__stats">
        <svg
          onClick={toggleFavourite}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="18px"
          height="18px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
        </svg>
        {/* {postFavs >= 0 && <p>{postFavs}</p>} */}
        <p>{postFavs}</p>
      </div>
    </article>
  );
};

export default Post;
