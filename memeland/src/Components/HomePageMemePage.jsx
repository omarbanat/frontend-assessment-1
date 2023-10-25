import React, { useEffect, useState } from "react";
import "../css/HomePageMemePage.css";
import HomePageMeme from "./HomePageMeme";

const HomePageMemePage = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/meme/getAll")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMemes(data.data);
        }
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="MemePage">
      {memes.map((meme) => (
        <HomePageMeme
          key={meme._id}
          MemeImage={meme.image}
          MemeCaption={meme.textCaption}
        />
      ))}
    </div>
  );
};

export default HomePageMemePage;
