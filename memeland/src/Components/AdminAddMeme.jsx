import React, { useState } from "react";
import "../css/AdminAddMeme.css";

const AdminAddMeme = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleAddMeme = async () => {
    const userId = localStorage.getItem("userId"); 

  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("textCaption", caption);
    formData.append("user_id", userId);

    try {
      const response = await fetch("http://localhost:5000/meme/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Meme added successfully");
        setImage(null);
        setCaption("");
      } else {
        const data = await response.json();
        alert("Failed to add meme: " + data.message);
      }
    } catch (error) {
      console.error("Error adding meme: ", error);
    }
  };

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
