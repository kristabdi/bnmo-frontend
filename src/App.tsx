import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LoginForm from "./pages/LoginPage";
import RegisterForm from "./pages/RegisterPage";
import Dashboard from './pages/Dashboard';
import RequestForm from './pages/Request';
import TransactionForm from './pages/Transaction';
import TransactionHistory from './pages/TransactionHistory';
import RequestHistory from './pages/RequestHistory';
import UserVerifPage from './pages/UserVerif';
import ReqVerifPage from './pages/ReqVerif';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    const is_admin = Cookies.get("is_admin");
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(is_admin && is_admin === "true" ? true : false);
    }
  });
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/dashboard" element={isLoggedIn && !isAdmin ? <Dashboard/> : <LoginForm/>}/>
          <Route path="/request" element={isLoggedIn && !isAdmin ? <RequestForm/> : <LoginForm/>}/>
          <Route path="/transaction" element={isLoggedIn && !isAdmin ? <TransactionForm/> : <LoginForm/>}/>
          <Route path="/transhistory" element={isLoggedIn && !isAdmin ? <TransactionHistory/> : <LoginForm/>}/>
          <Route path="/reqhistory" element={isLoggedIn && !isAdmin ? <RequestHistory/> : <LoginForm/>}/>
          <Route path="/userverif" element={isLoggedIn && isAdmin ? <UserVerifPage/> : <LoginForm/>}/>
          <Route path="/reqverif" element={ isLoggedIn && isAdmin ? <ReqVerifPage/> : <LoginForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
