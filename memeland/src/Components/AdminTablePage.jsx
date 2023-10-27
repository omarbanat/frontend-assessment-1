import React, { useEffect, useState } from "react";
import "../css/AdminTablePage.css";
import AdminAddMeme from "./AdminAddMeme";

const AdminTablePage = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [updatedCaption, setUpdatedCaption] = useState("");
  const userId = localStorage.getItem("userId");
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


  useEffect(() => {
    fetch("http://localhost:5000/meme/getAll")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const filteredMemes = data.data.filter((meme) => meme.user_id === userId);
          setMemes(filteredMemes);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [userId, handleAddMeme]);

  const handleEditMeme = (meme) => {
    setSelectedMeme(meme);
    setUpdatedCaption(meme.textCaption);
  };

  const handleUpdateMeme = (memeId) => {
    fetch(`http://localhost:5000/meme/update/${memeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textCaption: updatedCaption }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedMemes = memes.map((meme) =>
            meme._id === memeId ? { ...meme, textCaption: updatedCaption } : meme
          );
          setMemes(updatedMemes);
          setSelectedMeme(null);
          setUpdatedCaption("");
          alert("Meme updated successfully.");
        } else {
          console.error("Error updating meme:", data.message);
        }
      })
      .catch((error) => console.error("Error updating meme: ", error));
  };

  const handleDeleteMeme = (memeId) => {
    fetch(`http://localhost:5000/meme/delete/${memeId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const updatedMemes = memes.filter((meme) => meme._id !== memeId);
          setMemes(updatedMemes);
          alert("Meme deleted successfully.");
        } else {
          console.error("Error deleting meme:", data.message);
        }
      })
      .catch((error) => console.error("Error deleting meme: ", error));
  };

  const handleCancelEdit = () => {
    setSelectedMeme(null);
    setUpdatedCaption("");
  };

  
  return (
    <div className="AdminTablePage">
      <table className="AdminTable">
        <thead>
          <tr>
            <th>Image</th>
            <th>Caption</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {memes.map((meme) => (
            <tr key={meme._id}>
              <td><img src={meme.image} alt="" /></td>
              <td>
                {selectedMeme && selectedMeme._id === meme._id ? (
                  <input
                    type="text"
                    value={updatedCaption}
                    onChange={(e) => setUpdatedCaption(e.target.value)}
                  />
                ) : (
                  <p>{meme.textCaption}</p>
                )}
              </td>
              <td>
                {selectedMeme && selectedMeme._id === meme._id ? (
                  <button onClick={() => handleUpdateMeme(meme._id)}>Save</button>
                ) : (
                  <a href="#" onClick={() => handleEditMeme(meme)}>
                    <img src="Images/pen-to-square-solid.svg" alt="" />
                  </a>
                )}
              </td>
              <td>
                <a href="#" onClick={() => handleDeleteMeme(meme._id)}>
                  <img src="Images/trash-solid.svg" alt="" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminAddMeme
      handleImageChange = {handleImageChange}
      handleCaptionChange = {handleCaptionChange}
      handleAddMeme = {handleAddMeme}
      caption = {caption}


       
      />
    </div>
  );
};

export default AdminTablePage;
