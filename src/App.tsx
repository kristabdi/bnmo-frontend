import React, {useEffect, useState} from 'react';
import LoginForm from "./pages/LoginPage";
import RegisterForm from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  
  useEffect(() => {
    localStorage.clear();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/register"/> : <Navigate to='/login'/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
