import './App.css';
import {React,useState,useEffect} from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';
import pen from './images/pencil-solid.svg';
import trash from './images/trash-solid.svg';
function Dashboard() {

    const location = useLocation();
    const name = new URLSearchParams(location.search).get('name');
    const [render,setRender]=useState(true);
    const [Memes,setMemes]=useState([]);
    const [selectedMeme, setSelectedMeme] = useState(null);
    const [image,setImage]=useState('');
    const [caption,setCaption]=useState('');

    useEffect(()=>{
        axios.get(`http://localhost:5000/memes/getMemesByCreator/${name}`)
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
    const handleDeleteMeme = (id) => {
        const username = {
          username: name,
        };
      
       
        axios.delete(`http://localhost:5000/memes/delete/${id}`, { data: username })
          .then(() => {
            console.log("Meme deleted");
            setRender(!render);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      

      const handleUpload = async (id) => {
        if (!image) {
          console.error('No file selected');
          return;
        }
       
        const formData = new FormData();
        formData.append('image', image);
    
        try {
          const response = await axios.post(
            'https://api.imgbb.com/1/upload?key=61433a8c98f2a424d6ab481eca2fb4a0',
            formData
          );
          const imageUrl = response.data.data.url;
          console.log(imageUrl);
          setImage(imageUrl);
          console.log('Image uploaded successfully:', imageUrl);
          
          try {
            const response2 = await fetch(`http://localhost:5000/memes/update/${id}`,  {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                imageUrl: imageUrl,
                caption: caption,
                username:"mhmd123"
              }),
            });
          
            if (!response2.ok) {
              throw new Error(`errorrr`);
            }
            const responseData = await response2.json();
            setSelectedMeme(null);
            setImage('');
            setCaption('');
            setRender(!render);
          } catch (error) {
            console.error(error);
          }
          
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };


      const handleAdd = async (e) => {
        e.preventDefault();
        if (!image) {
          console.error('No file selected');
          return;
        }
       
        const formData = new FormData();
        formData.append('image', image);
    
        try {
          const response = await axios.post(
            'https://api.imgbb.com/1/upload?key=61433a8c98f2a424d6ab481eca2fb4a0',
            formData
          );
          const imageUrl = response.data.data.url;
          setImage(imageUrl);
          console.log('Image uploaded successfully:', imageUrl);
          const newMeme={
            imageUrl:imageUrl,
            caption:caption,
            creator:name
          }
          try {
            const response2 = axios.post(`http://localhost:5000/memes/add`,newMeme,  {
            
              headers: {
                'Content-Type': 'application/json',
              },
             
            }).then(()=>{
                console.log("meme added")
            })
            .catch((error)=>{
                console.error(error)
            })
            setRender(!render);
          } catch (error) {
            console.error(error);
          }
          
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };


  return (
   <div>
    <div className="sidebar">
        <h1>Dashboard</h1>
        <hr style={{width:"100%",color:"white"}} />
        <ul>
            <li>Add memes</li>
            <li>Update memes</li>
            <li>Delete memes</li>
        </ul>
    </div>
    <main className='home-main' style={{marginLeft:"250px"}}>
            {Memes && Memes.map((meme,index)=>{
                return(
                    <div>
                    <div className='meme' key={index} >
                        <img src={meme.imageUrl} alt='image' />
                        <p>{meme.caption}</p>
                        <div>
                            <img src={pen} style={{width:"20px"}} alt="" onClick={() => handleMemeClick(meme)} />
                            <img src={trash} style={{width:"20px"}} alt=""  onClick={() => handleDeleteMeme(meme._id)}/>
                        </div>
                    </div>
                    {selectedMeme && (
                        <div className='pop-up'>
                            <div className='pop-up-content' style={{display:"flex",flexDirection:"column",
                            alignItems:"center",gap:"50px",justifyContent:"center"}}>
                                <span className='close-button' onClick={closeMeme}>
                                    &times;
                                </span>
                                <label htmlFor="">update image<input type="file" onChange={(e) =>setImage(e.target.files[0]) } /></label>
                                <label htmlFor="">update caption<input type="text" onChange={(e) =>setCaption(e.target.value) } /></label>
                                <button onClick={() => handleUpload(meme._id)}>update</button>
                            </div>
                        </div>
                    )}
                </div>);
            })
            }
            <div>
            
            <div className='meme' style={{display:"flex",flexDirection:"column",
                            alignItems:"center",gap:"50px",justifyContent:"center"}}>
                                
                                <label htmlFor="">choose image<input type="file" onChange={(e) =>setImage(e.target.files[0]) } /></label>
                                <label htmlFor="">add caption<input type="text" onChange={(e) =>setCaption(e.target.value) } /></label>
                                <button onClick={handleAdd}>add meme</button>
                            
            </div>
            </div>
        </main>
   </div>
  );
}

export default Dashboard;
