import React, { useEffect, useState } from 'react';
import './meme.css';

function Meme() {
    const [memedata, setMemeData] = useState([]);

    // Define fetchData function
    const fetchData = () => {
        fetch('http://localhost:8000/meme/getAll')
            .then((response) => response.json())
            .then((responseData) => setMemeData(responseData.data))
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
        <div className="background">
            <div className="nav">
                <h1 className="title">MEME</h1>
               
            </div>
            <div className="content">
                {memedata.map((meme) => (
                    <div key={meme.id} className="meme-card">
                        <img src={meme.image} alt="meme" className="img" />
                        <p className="textcaption">{meme.textCaption}</p>
                        <p className="user">{meme.user_id}</p>
                    </div>
                ))};
            </div>
        </div>
        </div>
    );
}

export default Meme;
