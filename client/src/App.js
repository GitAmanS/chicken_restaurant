import React, { useEffect } from 'react';
import './App.css';
import './components/fonts.css';
import Header from './components/Header';
import Menu from './components/Menu';

function App() {
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="bg-amber-500 flex">
      <div
        className='flex-1 min-h-screen custom-border mx-4 md:mx-24 mt-4 md:mt-7 p-4 md:p-8 bg-cover bg-center md:rounded-tr-[80px] md:rounded-tl-[80px] '
        style={{ backgroundImage: 'url("chicken.jpg")' }}
      >
        <Header />
        <Menu />
      </div>
    </div>
  );
}

export default App;
