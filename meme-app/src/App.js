
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import SignUp  from './components/SignUp';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/Login' element={<Login/>}/>
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
