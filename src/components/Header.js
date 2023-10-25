import React from "react";
import { Link } from 'react-router-dom';
import logo from "../images/troll-face.png"
import '../styles/header.css'


const Home = () => {
    return (
        <header>
            <div className="logo-title">
                <img src={logo} alt="meme" />
                <h2 className="title">THE Memester</h2>
            </div>
            <Link to="/login">
                <button className="login">Login/Register</button>
            </Link>


        </header>
    );
}
export default Home