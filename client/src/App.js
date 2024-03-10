import React, { useEffect } from 'react';
import './App.css';
import './components/fonts.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Orders from './components/Orders';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import Auth from './components/Auth/Auth';
import { UserProvider } from './context/UserContext';

function App() {
  document.body.style.overflow = 'hidden';


  return (
    <UserProvider>

      <div className="bg-amber-500 flex">
        <div
          className='flex-1 min-h-screen custom-border mx-4 md:mx-24 mt-4 md:mt-7 p-4 md:p-8 bg-cover bg-center md:rounded-tr-[80px] md:rounded-tl-[80px] '
          style={{ backgroundImage: 'url("chicken.jpg")' }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/services" element={<Services />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>

      
 
    </UserProvider>
  );
}

export default App;
