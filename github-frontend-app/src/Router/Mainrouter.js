import React from "react";
import { Routes, Route } from "react-router";
import Home from "../pages/Home";

export default function Mainrouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
