import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import "../InputForm.css";
import { createUser } from "../../Redux/action";
// import { createUser } from "../Redux/action";
const CreateUsersList = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { isLoading, isError, users } = useSelector(
    (state) => state.githubusers
  );
  console.log(users, "users");
  const handleSubmit = () => {
    if (!username.trim()) {
      alert("Username cannot be empty");
      return;
    }
    dispatch(createUser(username.trim()))
      .then(() => {
        alert("User created successfully");
      })
      .catch((error) => {
        alert("Error creating user");
      });
  };

  return (
    <>
      <div className="input-form">
        <input
          className="input-field"
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="search-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div>{/* <RepositoryList /> */}</div>
    </>
  );
};

export default CreateUsersList;
