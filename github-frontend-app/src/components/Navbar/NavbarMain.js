import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router";
export default function NavbarMain() {
  const navigate = useNavigate();
  return (
    <div className="Navbar">
      <h1>GitHub Users</h1>
      <div className="create-button-container">
        <h3 onClick={() => navigate("/repositories-list")} className="link">Repository List</h3>
        <button
          className="create-button"
          onClick={() => navigate("/create-users-list")}
        >
          Craete Github Users
        </button>
      </div>
    </div>
  );
}
