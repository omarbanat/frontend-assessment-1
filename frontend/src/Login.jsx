import "./Login.css";
function Login(){

    return(
       <>

       <div className="ensemble">
        <div className="titles">
    <h1>memeWorld</h1>
    <h1>Unlock the laughter vault</h1>
    </div>
       <div className="white-block">
        <div className=""><h1>Welcome to 
    memeWorld!</h1></div>
        <div className=""><h2>Please enter your details</h2></div>
        <div className="username">
            <h1>Username</h1>
            <div className="username-field"><input type="text" placeholder="Username"/></div>
        </div>
        <div className="">
        <h1>Email</h1>
            <div className="email-field"><input type="text" placeholder="Email" /></div>
        </div>
        <div className="">
        <h1>Password</h1>
            <div className="password-field"><input type="password" placeholder="Password" /></div> 
        </div>
        <div className="">
        <h1>Confirm password</h1>
            <div className="confirm-field"><input type="password" placeholder="Confirmation" /></div>
        </div>
        <div className=""><button className="login-btn">Login</button></div>
 
       </div>
       </div>

       </>
    );
}
export default Login;

