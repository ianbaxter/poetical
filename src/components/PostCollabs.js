import React, { useState } from "react";
import axios from "axios";
import Options from "../components/Options";

const PostCollab = ({ post }) => {
  const [newCollaborator, setCollaborator] = useState("");

  const addCollaborator = () => {
    if (newCollaborator === "") return;
    if (newCollaborator === sessionStorage.getItem("username"))
      return console.log("Cannot add yourself as a collaborator");

    let collaborators = post.collaborators;

    // Check if already a collaborator
    if (
      collaborators.length > 0 &&
      collaborators.filter(
        (collaborator) => collaborator.username === newCollaborator
      ).length > 0
    ) {
      console.log("User is already a collaborator");
      return;
    }

    // Check if new collaborator is a user and if so return their ID
    const data = { username: newCollaborator };
    axios
      .get(process.env.REACT_APP_BASE_URL + "/api/users", {
        params: data,
      })
      .then((res) => {
        const collaboratorId = res.data;
        const newCollaboratorData = {
          id: collaboratorId,
          username: newCollaborator,
        };
        collaborators.push(newCollaboratorData);

        const data = { collaborators };
        axios
          .put(process.env.REACT_APP_BASE_URL + "/api/home/" + post._id, data)
          .then((res) => {
            console.log("Added new collaborator: " + newCollaborator);
            setCollaborator("");
          })
          .catch((err) => {
            console.log("Error updating post: " + err);
          });
      })
      .catch((err) => console.log("This user does not exist: " + err));
  };

  const removeCollaborator = () => {
    if (newCollaborator === "") return;
    let collaborators = post.collaborators;
    let collaboratorIndex = -1;
    collaborators.forEach((collaborator, index) => {
      if (collaborator.username === newCollaborator) collaboratorIndex = index;
    });

    if (collaboratorIndex >= 0) {
      console.log("Remove collaborator");

      collaborators.splice(collaboratorIndex, 1);

      const data = { collaborators };
      axios
        .put(process.env.REACT_APP_BASE_URL + "/api/home/" + post._id, data)
        .then((res) => {
          setCollaborator("");
        })
        .catch((err) => {
          console.log("Error updating post: " + err);
        });
    }
    return;
  };

  const handleInputChange = (e) => {
    setCollaborator(e.target.value);
  };

  return (
    <div className="card">
      <div>
        <h2>Collaborators:</h2>
        <div>
          {post.collaborators.length > 0 ? (
            post.collaborators.map((collaborator) => (
              <li key={collaborator.id}>{collaborator.username}</li>
            ))
          ) : (
            <p className="p--secondary">No Collaborators</p>
          )}
        </div>
      </div>
      <hr className="divider" />
      <div>
        <label htmlFor="collaborator" id="collaborator-label">
          Collaborator Username:
        </label>
        <input
          type="text"
          name="collaborator"
          aria-labelledby="collaborator-label"
          cols="50"
          rows="1"
          placeholder="Username (case sensitive)"
          value={newCollaborator}
          onChange={handleInputChange}
        />
        <Options>
          <div className="options__left">
            <button className="btn" onClick={addCollaborator}>
              Add
            </button>
          </div>
          <div className="options__right">
            <button className="btn btn--red" onClick={removeCollaborator}>
              Remove
            </button>
          </div>
        </Options>
      </div>
    </div>
  );
};

export default PostCollab;
