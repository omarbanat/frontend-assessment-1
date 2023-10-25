import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div class="header">
            <div>
            <Link to="/Login"  ><button>Login</button></Link>
            <Link to= "/SignUp"  > <button>SignUp</button></Link>
            </div>
        </div>
    )
}
export default Navbar;