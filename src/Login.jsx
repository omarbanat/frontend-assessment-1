import {React,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './App.css';
import register from './images/register.jpg';
function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Cpassword, setCpassword] = useState(''); 
  
    const handleLoginClick = async (e) => {
        e.preventDefault();
      if (!email || !password || !Cpassword || password!==Cpassword) {
        alert('Please provide both email and password.');
        return;
      }
          await axios.get(`http://localhost:5000/users/get/${email}/${password}`)
          .then((response)=>{
            console.log("logged in successfully");
            if(response.data.data.role.toLowerCase()==="user"){
              navigate('/home');
            }
            else{
              navigate(`/dashboard?name=${response.data.data.username}`);
            }
          })
          .catch((error)=>{
            console.error(error);
          })};

  return (
   <div className='register-container'>
    <img src={register} alt="" />
    <div className='register'>
        
            <ul>
                <li>___________</li>
                <li>___________</li>
                <li>___________</li>
                <li>___________</li>
                <li></li>
            </ul>
          
            <h1>Login</h1>
            <form action="" onSubmit={handleLoginClick}>
                <label htmlFor="Email">Email<br/><br/><input type="email" style={{width:"386px"}} onChange={(e)=>{setEmail(e.target.value)}}  /></label>
                <div className="label">
                <label htmlFor="Password">Password<br/><br/><input type="password" onChange={(e)=>{setPassword(e.target.value)}}/></label>
                <label htmlFor="C-Password">Confirm Password<br/><br/><input type="password" onChange={(e)=>{setCpassword(e.target.value)}}/></label>
                </div>
                <button>Login</button>
            </form>
    </div>
   </div>
  );
}

export default Login;
