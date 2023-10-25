import {React,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './App.css';
import register from './images/register.jpg';
function Register() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Cpassword, setCpassword] = useState(''); 
    const [role, setRole] = useState('');
  
    const handleRegisterClick = async (e) => {
        e.preventDefault();
      if (!email || !password || !Cpassword || password!==Cpassword || !username || !role) {
        alert('Please provide both email and password.');
        return;
      }
      const newUser={
        username:username,
        email:email,
        password:password,
        role:role
      }
          await axios.post(`http://localhost:5000/users/add/`,newUser,{
            "headers":"application/json"
          })
          .then((response)=>{
            console.log(response.data);
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
          
            <h1>Let's get started</h1>
            <form action="" onSubmit={handleRegisterClick}>
                <div className="label">
                <label htmlFor="Username">Username<br/><br/><input type="text" onChange={(e)=>{setUsername(e.target.value)}} /></label>
                <label htmlFor="Role">Role<br/><br/><input type="text" placeholder='Meme Creator/User'  onChange={(e)=>{setRole(e.target.value)}} /></label>
                </div>
                <label htmlFor="Email">Email<br/><br/><input type="email" style={{width:"386px"}}  onChange={(e)=>{setEmail(e.target.value)}}  /></label>
                <div className="label">
                <label htmlFor="Password">Password<br/><br/><input type="password"  onChange={(e)=>{setPassword(e.target.value)}}/></label>
                <label htmlFor="C-Password">Confirm Password<br/><br/><input type="password"  onChange={(e)=>{setCpassword(e.target.value)}}/></label>
                </div>
                <button>Get Started</button>
            </form>
    </div>
   </div>
  );
}

export default Register;
