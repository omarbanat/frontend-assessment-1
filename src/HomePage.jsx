import {React,useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import register from './images/register.jpg';
function Home() {
    const [render,setRender]=useState(true);
    const [Memes,setMemes]=useState([]);
    const [selectedMeme, setSelectedMeme] = useState(null);
    useEffect(()=>{
        axios.get('http://localhost:5000/memes/getAllMemes')
        .then((response)=>{
            console.log(response.data.data);
            setMemes(response.data.data);
        })
        .catch((error)=>{
            console.error(error)
        })
    },[render])
    
    const handleMemeClick = (meme) => {
        setSelectedMeme(meme);
    };

    const closeMeme = () => {
        setSelectedMeme(null);
    };
  return (
   <div>
        <header className='home-header'>
            <h1>YOU MUST BE BORED TO BE HERE BUDDY!</h1>
            <h2>LET’S HAVE FUN TOGETHER</h2>
        </header>
        <main className='home-main'>
            {Memes && Memes.map((meme,index)=>{
                return(
                    <div>
                    <div className='meme' key={index} onClick={() => handleMemeClick(meme)}>
                        <img src={meme.imageUrl} alt='image' />
                        <p>{meme.caption}</p>
                    </div>
                    {selectedMeme && (
                        <div className='pop-up'>
                            <div className='pop-up-content'>
                                <span className='close-button' onClick={closeMeme}>
                                    &times;
                                </span>
                                <img src={selectedMeme.imageUrl} alt='image' />
                                <p>Caption: {meme.caption}<br/>
                                   Created by: {selectedMeme.creator}<br/>
                                   Created at: {selectedMeme.createdAt.substring(0,selectedMeme.createdAt.indexOf('T'))}
                                </p>
                            </div>
                        </div>
                    )}
                </div>);
            })
            }
        </main>
        <footer className='home-footer'>
            <h2>always check our social media to stay up to date</h2>
            <div></div>
        </footer>
   </div>
  );
}

export default Home;
