import '../css/DisplayMeme.css';
function Meme({MemeImage,MemeCaption}) {
  return (
    
<div className="Meme-container" id="Meme-container">
 <div className='"MemeImageContainer'><img src={MemeImage} className="MemeImage" ></img></div>
        <div className="Meme-content">

        <div>
          <p className="Meme_P">{MemeCaption}</p>
        </div> 
        
        </div>

        </div>


  );
}

export default Meme;
