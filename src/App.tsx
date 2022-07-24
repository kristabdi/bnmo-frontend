import React, {useEffect, useState} from 'react';
import LoginForm from "./pages/LoginPage";
import RegisterForm from "./pages/RegisterPage";
import Dashboard from './pages/Dashboard';
import RequestForm from './pages/Request';
import TransactionForm from './pages/Transaction';
import TransactionHistory from './pages/TransactionHistory';
import RequestHistory from './pages/RequestHistory';
import UserVerifPage from './pages/UserVerif';
import ReqVerifPage from './pages/ReqVerif';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/transhistory"/> : <Navigate to='/reqhistory'/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/request" element={<RequestForm/>}/>
          <Route path="/transaction" element={<TransactionForm/>}/>
          <Route path="/transhistory" element={<TransactionHistory/>}/>
          <Route path="/reqhistory" element={<RequestHistory/>}/>
          <Route path="/userverif" element={<UserVerifPage/>}/>
          <Route path="/reqverif" element={<ReqVerifPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
