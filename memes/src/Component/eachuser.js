import React, { useEffect, useState } from 'react';
import '../eachUser.css';
import Edit from './edit.png';
import Save from './tick mark.png';
import Delete from './bin.png';

const MemeList = () => {
  const [memeData, setMemeData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [editingMemeId, setEditingMemeId] = useState(null);
  const [editedCaption, setEditedCaption] = useState('');
  const [addingNewMeme, setAddingNewMeme] = useState(false);
  const [newMemeCaption, setNewMemeCaption] = useState('');
  const [newMemeImage, setNewMemeImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

    if (storedUserId) {
      const apiUrl = `http://localhost:5000/meme/getmeme/${storedUserId}`;

      fetch(apiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch data from the API');
          }
        })
        .then((data) => {
          setMemeData(data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error('User ID is not available in local storage');
    }
  }, []);

  const handleEditMeme = (memeId) => {
    setEditingMemeId(memeId);

    const memeToEdit = memeData.find((meme) => meme._id === memeId);

    setEditedCaption(memeToEdit.textCaption);
  };

  const handleSaveEdit = (memeId) => {
    const apiUrl = `http://localhost:5000/meme/update/${memeId}`;
    const updatedMemeData = memeData.map((meme) => {
      if (meme._id === memeId) {
        return { ...meme, textCaption: editedCaption };
      }
      return meme;
    });

    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ textCaption: editedCaption }),
    })
      .then((response) => {
        if (response.ok) {
          setEditingMemeId(null);
          setMemeData(updatedMemeData);
        } else {
          console.error('Error updating the meme');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDeleteMeme = (memeId) => {
    const apiUrl = `http://localhost:5000/meme/delete/${memeId}`;

    fetch(apiUrl, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedMemeData = memeData.filter((meme) => meme._id !== memeId);
          setMemeData(updatedMemeData);
        } else {
          console.error('Error deleting the meme');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleAddNewMeme = () => {
    setAddingNewMeme(true);
  };

  const handleSaveNewMeme = () => {
    const apiUrl = 'http://localhost:8000/upload'; // Assuming this is your image upload endpoint.
    const formData = new FormData();
    formData.append('file', newMemeImage);

    fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to upload the file.');
        }
      })
      .then((data) => {
        const imageUrl = data.imageUrl;
        const memeApiUrl = 'http://localhost:5000/meme/addmeme'; 

        const memeDataToPost = {
          textCaption: newMemeCaption,
          image: imageUrl,
          user_id: userId,
        };

        return fetch(memeApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memeDataToPost),
        });
      })
      .then((memeResponse) => {
        if (memeResponse.ok) {
          return memeResponse.json();
        } else {
          throw new Error('Failed to add the meme');
        }
      })
      .then((memeData) => {
        const newMeme = {
          _id: memeData._id,
          textCaption: memeData.textCaption,
          image: memeData.image,
        };
        setMemeData([...memeData, newMeme]);
        setAddingNewMeme(false);
        setNewMemeCaption('');
        setNewMemeImage(null);
        setUploadedImageUrl(memeData.image);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {userId ? (
        <div>
          <h2 className='dashboard'>Dashboard</h2>
          <button className='additionofnew' onClick={handleAddNewMeme}>
            Add New Meme
          </button>
          {addingNewMeme && (
            <div>
              <input
                type='text'
                placeholder='Caption'
                value={newMemeCaption}
                onChange={(e) => setNewMemeCaption(e.target.value)}
              />
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setNewMemeImage(e.target.files[0])}
              />
              <button onClick={handleSaveNewMeme}>Save New Meme</button>
              {uploadedImageUrl && (
                <div>
                  Image URL: <a href={uploadedImageUrl} target="_blank">{uploadedImageUrl}</a>
                </div>
              )}
            </div>
          )}
          {memeData.map((meme) => (
            <div key={meme._id}>
              <img className='theimage' src={meme.image} alt='Meme' />
              <div className='caption-and-button'>
                {editingMemeId === meme._id ? (
                  <div>
                    <input
                      type='text'
                      className='edited'
                      value={editedCaption}
                      onChange={(e) => setEditedCaption(e.target.value)}
                    />
                    <button className='savebutton' onClick={() => handleSaveEdit(meme._id)}>
                      <img className='save' src={Save} alt='Save' />
                    </button>
                  </div>
                ) : (
                  <div className='eleditwcaptionsawa'>
                    <p>{meme.textCaption}</p>
                    <button className='editbutton' onClick={() => handleEditMeme(meme._id)}>
                      <img className='edit' src={Edit} alt='Edit' />
                    </button>
                    <button className='deletebutton' onClick={() => handleDeleteMeme(meme._id)}>
                    <img className='edit' src={Delete} alt='Edit' />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>User ID not found in local storage.</p>
      )}
    </div>
  );
};

export default MemeList;
