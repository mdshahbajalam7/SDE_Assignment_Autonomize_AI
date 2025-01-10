import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import "./InputForm.css";
import RepositoryList from "./RepositoryList";
import { createUser, fetchUserData } from "../Redux/action";
const InputForm = () => {
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
    dispatch(createUser(username.trim()));
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
          Search
        </button>
      </div>
    
    </>
  );
};

export default InputForm;
