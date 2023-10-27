import React, { useState } from "react";
import "../css/AdminAddMeme.css";

const AdminAddMeme = ({handleAddMeme, handleImageChange, handleCaptionChange, caption }) => {
  

  return (
    <div className="AdminContainer">
      <div className="AdminTitle">Add Meme</div>
      <div className="AdminContent">
        <div className="AdminLeft">
          <img src="Images/LogoAdmin.png" alt="Image" />
          <div className="AdminCaption">Make it funny</div>
        </div>
        <div className="AdminRight">
          <div className="AdminForm">
            <form id="imageForm" encType="multipart/form-data">
              <div className="AdminFormTitle">Add Image</div>
              <input
                type="file"
                id="imageInput"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="AdminFormTitle">Add Caption</div>
              <textarea
                id="captionInput"
                name="caption"
                className="AdminFormTextArea"
                value={caption}
                onChange={handleCaptionChange}
              ></textarea>
              <div className="AdminSubmitButton">
                <a href="#" onClick={handleAddMeme}>
                  Add
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddMeme;
