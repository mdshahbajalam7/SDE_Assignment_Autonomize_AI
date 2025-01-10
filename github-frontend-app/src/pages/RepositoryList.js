import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../Redux/action";
import "./RepositoryList .css";
import { useNavigate } from "react-router";

export default function RepositoryList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, users } = useSelector(
    (state) => state.githubusers
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div className="repository-list-container">
      <button onClick={() => navigate("/")} className="back-button">
        Back
      </button>
      {isLoading && <div className="loading">Loading...</div>}
      {isError && (
        <div className="error-message">
          Failed to fetch data. Please try again.
        </div>
      )}
      {!isLoading && !isError && (
        <div className="repository-grid">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="repository-card">
                <h3>{user.name}</h3>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Repositories:</strong> {user.public_repos}
                </p>
                <p>
                  <strong>Bio:</strong> {user.bio || "No bio available"}
                </p>
                <a href={user.blog} target="_blank" rel="noopener noreferrer">
                  Visit Blog
                </a>
              </div>
            ))
          ) : (
            <p>No users available.</p>
          )}
        </div>
      )}
    </div>
  );
}
