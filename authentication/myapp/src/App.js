import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import NavBar from './components/Navbar'; 








const App = () => {
  return (
    <Router>
       <ToastContainer />
      <NavBar /> 
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route  path="/protected"  element={<ProtectedRoute><div>Protected Content</div></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
};

export default App;
