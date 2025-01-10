import React from "react";
import { Routes, Route } from "react-router";
import NavbarMain from "../components/Navbar/NavbarMain";
import InputForm from "../pages/InputForm";
import CreateUsersList from "../pages/Createuserslist/CreateUsersList";
import RepositoryList from "../pages/RepositoryList";
// import RepositoryList from "../pages/RepositoryList";

export default function Mainrouter() {
  return (
    <>
      <NavbarMain />
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/repositories-list" element={<RepositoryList />} />
        <Route path="/create-users-list" element={<CreateUsersList />} />
      </Routes>
    </>
  );
}
