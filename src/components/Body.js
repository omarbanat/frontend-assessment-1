import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Body = () => {

    const [memes, setMemes] = useState([]);

    useEffect(() => {

        const fetchMemes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/meme/getAll');
                setMemes(response.data.data);
            } catch (error) {
                console.error('Error fetching memes:', error);
            }
        };


        fetchMemes();
    }, []);

    return (
        <div>
            <h1>All Memes</h1>
            <ul>
                {memes.map((meme) => (
                    <li key={meme._id}>{meme.textCaption}</li>
                ))}
            </ul>
        </div>
    );
};


export default Body