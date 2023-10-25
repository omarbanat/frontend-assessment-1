import React from "react";
import "../css/HomePage.css";
import HomeTopPage from "./HomeTopPage";
import HomePageMemePage from "./HomePageMemePage";
const HomePage = () => {
  return (
    <div>
      <HomeTopPage />
      <HomePageMemePage />
    </div>
  );
};

export default HomePage;
