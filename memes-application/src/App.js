import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Meme from './Components/Meme';
import AdminPage from './Components/AdminPage';

function App() {
  const [userRole, setUserRole] = useState('regular');

  function RedirectToLogin() {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/regular" element={userRole === 'regular' ? <Meme /> : <RedirectToLogin />} />
          {/* <Route path="/regular" element={<Meme />}/> */}
          <Route path="/admin" element={userRole === 'admin' ? <AdminPage /> : <RedirectToLogin />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
