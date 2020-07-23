import React, { useState } from "react";
import history from "../history";
import axios from "axios";

const Post = ({ post, setPosts }) => {
  const [postFavs, setPostFavs] = useState(post.meta.favs);
  const [postFavsUserIds, setPostFavsUserIds] = useState(post.meta.favsUserIds);

  let userId = sessionStorage.getItem("userId");
  let collaboratorList = ", ";
  post.collaborators.forEach((collaborator, index) => {
    collaboratorList += collaborator.username;
    if (index < post.collaborators.length - 1) collaboratorList += ", ";
  });

  const toggleFavourite = (e) => {
    e.preventDefault();
    if (!userId) {
      console.log("You must be logged in to favoutie posts");
      return;
    }

    let favsUserIds = postFavsUserIds;
    let favs = postFavs;

    let userIdIndex = favsUserIds.indexOf(userId);
    if (userIdIndex >= 0) {
      // User has already favourited this post
      favsUserIds.splice(userIdIndex, 1);
      favs--;
    } else {
      // User has not already favourited this post
      favsUserIds.push(userId);
      favs++;
    }

    const data = {
      meta: { favs, favsUserIds },
    };
    axios
      .put(process.env.REACT_APP_BASE_URL + "/api/home/" + post._id, data)
      .then((res) => {
        setPostFavs(favs);
        setPostFavsUserIds(favsUserIds);
      })
      .catch((err) => {
        console.log("Error updating post: " + err);
      });
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    if (!setPosts) return;

    const data = {
      params: {
        tag,
      },
    };
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/home/", data)
      .then((res) => {
        history.push("/?tag=" + tag);
        let postsReversed = res.data.reverse();
        setPosts(postsReversed);
      })
      .catch((err) => {
        console.log("Error getting posts by tag: " + err);
      });
  };

  return (
    <article className="post">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <hr className="divider" />
      {post.tags.length > 0 && (
        <div className={"tags" + (setPosts ? " tags--highlight" : "")}>
          {post.tags.map((tag, index) => (
            <p key={index} onClick={(e) => handleTagClick(e, tag)}>
              {"# " + tag}
            </p>
          ))}
        </div>
      )}
      <div className="post__details">
        {post.collaborators.length > 0 ? (
          <div className="collaborators">
            <p className="metaLabel">Authors:</p>
            <p>{post.username + collaboratorList}</p>
          </div>
        ) : (
          <div>
            <p>Author: {post.username}</p>
          </div>
        )}
        <div>
          <p>
            {"Posted: " +
              new Date(post.date).toLocaleString("en-GB", { timeZone: "UTC" })}
          </p>
        </div>
      </div>
      <div className="post__stats">
        {postFavsUserIds.includes(userId) ? (
          <svg
            onClick={toggleFavourite}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="18px"
            height="18px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
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
        )}
        <p data-testid="post-favs">{postFavs}</p>
        {post.isPrivate && <p>Private</p>}
      </div>
    </article>
  );
};

export default Post;
