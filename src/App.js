
import { Routes, Route} from "react-router-dom";
import HomePage from './components/Pages/Home.jsx';
import Login from "./components/Pages/Login.jsx";
import Dashboard from "./components/dashbaord/Dashboard.jsx";

function App() {
  return (
       <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
