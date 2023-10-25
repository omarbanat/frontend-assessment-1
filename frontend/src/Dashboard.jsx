import "./App.css";
import axios from "axios";
function Dashboard() {

const deleteMeme = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/memes/deleteMeme/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

const addMeme = () => {
    const newMeme = {
      "title": "When you realize it's Monday morning",
      "image": "monday.jpg",
      "tags": ["monday", "work", "morning", "humor"],
      "createdAt": "2023-10-22T07:15:00.000Z",
      "updatedAt": "2023-10-22T07:15:00.000Z"
    };

    axios
      .post("http://localhost:8000/api/memes/addMeme", newMeme)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

const updateMeme = (memeId) => {
  const updatedMeme = {
    "title": "this is a test update",
   "image": "update.png",
    "tags": ["testing", "tests", "testiee"],
    "createdAt": "2023-10-23T16:30:00.000Z",
    "updatedAt": "2023-10-23T16:30:00.000Z"
  };

  axios
    .put(`http://localhost:8000/api/memes/${memeId}`, updatedMeme)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
return (
    <div className="App">
      <div className='buttons123'>
      <button onClick={addMeme}>Add meme</button>
      <hr />
      <button onClick={() => deleteMeme("653823f40a1ac630ddff3286")}>
        Delete meme <img src="icons8-delete-16.png"></img>
      </button>
      <hr />
      <button onClick={() => updateMeme("6537ee158de166e8cc517e52")}>update meme</button>
      </div>


    </div>
  );
}

export default Dashboard;