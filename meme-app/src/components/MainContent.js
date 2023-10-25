import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainContent() {
  const [memes, setMemes] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/memes')
      .then((response) => {
        // console.log(response.data.result)
        setMemes(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="home-main">
      {memes&& memes.map((meme, index) => (
        <div key={index} className="single-meme">
          <img src={meme.image} alt="meme" />
          <span className="meme-title">{meme.text}</span>
          <span className="creator-name">Creator: {meme.creator}</span>
        </div>
      ))}
    </div>
  );
}

export default MainContent;
