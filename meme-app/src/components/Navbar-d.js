import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div class="header">
               <div className="mindiv">
                <Link to="/"><button className="header-button">Log Out</button></Link>
            </div>
        </div>
    )
}
export default Navbar;