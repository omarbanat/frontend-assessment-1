import React from "react";
import "../css/HomePageMeme.css";

const HomePageMeme = ({MemeImage,  MemeCaption}) => {
  return (
    <div className="HomePageMeme-container">
      <div className="HomePageMemeimage-container">
        <img src={MemeImage} alt="" />
      </div>
      
        <div className="HomePageMeme-Description">
          <p>
          {MemeCaption}
          </p>
        </div>
      
    </div>
  );
};

export default HomePageMeme;
