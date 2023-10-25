import React, { useState, useEffect } from 'react';
import Navbar from './Navbar-d';
import axios from 'axios';
function Dashboard() {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [memes, setMemes] = useState([]);
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const addMeme = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const imageResponse = await axios.post(
        'https://api.imgbb.com/1/upload?key=91d27c7f35f4cd3885f4ada2ac3d2c1c',
        formData
      );
      const imageUrl = imageResponse.data.data.url;
      const newMeme = {
        image: imageUrl,
        text: text,
        creator: "Hadi"
      };
      const result = await axios.post('http://localhost:5000/memes/add', newMeme, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (result.data) {
        setMemes([...memes, newMeme]);
        console.log("Meme added successfully");
      } else {
        throw new Error('An error occurred while adding the meme');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleEdit = () => {
    console.log('Editing meme at index');
  };
  const handleDelete = () => {
    console.log('Deleting meme at index',);
  };
  useEffect(() => {
    axios.get('http://localhost:5000/memes')
      .then((response) => setMemes(response.data.result))
      .catch((error) => console.error(error));
  }, []); 
  return (
    <>
      <Navbar />
      { Array.isArray(memes) && memes.map((meme, index) => (
        <div key={index} className="single-meme">
          <img src={meme.image} alt="meme" />
          <span className="meme-title">{meme.text}</span>
          <span className="creator-name">Creator: {meme.creator}</span>
          {/* <button onClick={() => handleEdit()}>Edit</button>
          <button onClick={() => handleDelete()}>Delete</button> */}
        </div>
      ))}
      <div className="newMemes">
        <hr className="line" />
        <h2>New Meme:</h2>
        <h3>Text:</h3>
        <input type="text" value={text} onChange={handleTextChange} />
        <h3>Photo:</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={addMeme}>Add</button>
      </div>
    </>
  );
}

export default Dashboard;
