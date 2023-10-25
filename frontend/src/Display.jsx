// import "./App.css";
// import React, { useState } from "react";
// import axios from "axios";
// function Display(){
//     const [memes, setMemes] = useState([]);
//     const getMeme = () => {
//         axios
//           .get("http://localhost:5000/meme/getAll")
//           .then((res) => {
//             setMemes(res.data);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       };
//     return (
//         <>
//         <div className="header">
//         <h1 className="title">memeWorld</h1>
//             <h1>Welcome to Your Dashboard</h1>
//         </div>
//         <div className="App">
//           <div className='buttons123'>
//           <button onClick={getMeme}>Get meme</button>
//           </div>
//         </div>
//         <div className="memes-container">
//           {memes.map((meme, index) => (
//             <div key={index} className="meme-rectangle">
//               <img src={meme.imageUrl} alt={`Meme ${index}`} />
//             </div>
//           ))}
//         </div>
//         </>
//       );
// }

// export default Display;
// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function Display() {
//   const [memes, setMemes] = useState([]);

//   const getMeme = () => {
//     axios
//       .get("http://localhost:5000/meme/getAll")
//       .then((res) => {
//         console.log("API Response:", res); // Log the API response
//         setMemes(res.data);
//       })
//       .catch((err) => {
//         console.log("Error fetching memes:", err); // Log any errors
//       });
//   };

//   console.log("Rendered with memes:", memes); // Log the current state of memes

//   return (
//     <>
//       <div className="header">
//         <h1 className="title">memeWorld</h1>
//         <h1>Welcome to Your Dashboard</h1>
//       </div>
//       <div className="App">
//         <div className="buttons123">
//           <button onClick={getMeme}>Get meme</button>
//         </div>
//       </div>
//       <div className="memes-container">
//         {memes.length > 0 &&
//           memes.map((meme, index) => (
//             <div key={index} className="meme-rectangle">
//               <img src={meme.imageUrl} alt={`Meme ${index}`} />
//             </div>
//           ))}
//       </div>
//     </>
//   );
// }

// export default Display;

import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function Display() {
  const [memes, setMemes] = useState([]);

  const getMeme = () => {
    axios
      .get("http://localhost:5000/meme/getAll")
      .then((res) => {
        console.log("API Response:", res); // Log the API response
        setMemes(res.data.data);
      })
      .catch((err) => {
        console.log("Error fetching memes:", err); // Log any errors
      });
  };

  console.log("Rendered with memes:", memes); // Log the current state of memes

  return (
    <>
      <div className="header">
        <h1 className="title">memeWorld</h1>
        <h1>Welcome to Your Dashboard</h1>
        <input type="text" />
      </div>
      <div className="App">
        <div className="buttons123">
          <button onClick={getMeme}>Get meme</button>
        </div>
      </div>
      <div className="memes-container">
        {console.log(memes)}
        {memes.length > 0 &&
          memes.map((meme, index) => (
            <div key={index} className="meme-rectangle">
              <img src={meme.image} alt={`Meme ${index}`} />
              <p>{meme.title}</p>
              <p>{meme.tags[0]}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default Display;
