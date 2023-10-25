import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./Components/SignInPage";
import SignUpPage from "./Components/SignUpPage";
import HomePage from "./Components/HomePage";
import AdminPage from "./Components/AdminPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/SignInPage" element={<SignInPage />} />
      <Route path="/SignUpPage" element={<SignUpPage />} />
      <Route path="/AdminPage" element={<AdminPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
