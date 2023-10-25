import { useState, useEffect } from "react";
import axios from "axios";
import "../css/home.css";
import CardMeme from "./CardMeme";
const Home = () => {
  const { meme, setMeme } = useState("");

  const api = "";

  useEffect(() => {
    axios
      .get(api)
      .then((response) => {
        const { data } = response.data;
        {
          setMeme(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <header className="container">
        <div className="nav">
          <div className="logo">MEMES</div>
          <ul className="list-itmes">
            <li>Home</li>
            <li>Memes</li>
          </ul>
        </div>
      </header>
      <section className="container">
      <div className="memes">
       <CardMeme/>
       <CardMeme/>
       <CardMeme/>
       <CardMeme/>
       <CardMeme/>
       <CardMeme/>
       </div>
      </section>
    </div>
  );
};

export default Home;
