import React, { useEffect, useState } from 'react';
import '../default.css';
import Heart from './heart';
import '../default.css';

function MemeList() {
  const [memes, setMemes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/meme/getAllMemes';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setMemes(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleImageClick = (imageId) => {
    if (selectedImage === imageId) {
      // If the same image is clicked again, unselect it
      setSelectedImage(null);
    } else {
      setSelectedImage(imageId);
    }
  };

  return (
    <div>
      <h1 className='theTitleOfMemeList'>Our Memes</h1>
      <ul>
        {memes.map((meme) => (
          <div className='container' key={meme._id}>
            <img
              className={`image-container ${selectedImage === meme._id ? 'image-selected' : ''}`}
              src={meme.image}
              alt={meme.textCaption}
              onClick={() => handleImageClick(meme._id)}
            />
            <Heart />
            <p>{meme.textCaption}</p>
            <a
              href={`http://localhost:5000/downloadMeme?imageUrl=${encodeURIComponent(meme.image)}`}
              download={meme.textCaption + '.jpg'}
            >
              <button>Download</button>
            </a>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MemeList;
