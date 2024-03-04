import React, { useState } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import './fonts.css';
import { GrBladesVertical } from "react-icons/gr";
import { GrBladesHorizontal } from "react-icons/gr";
const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 md:p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className='flex sm:flex-row justify-center items-center space-x-3'>
          <div className="text-2xl text-white font-bold md:mr-4 anton-regular ">
            JUICY CHICKEN
          </div>
          {/* Toggle button for mobile */}
          <button
            className="md:hidden text-white py-3 px-3 rounded-full backdrop-blur-3xl poppins-regular text-3xl"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <GrBladesHorizontal /> : <GrBladesVertical />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute z-10 flex flex-col space-y-2 mt-28">
            <a
              href="#"
              className="text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg flex items-center justify-center"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg flex items-center justify-center"
            >
              Menu
            </a>
            <a
              href="#"
              className="text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg flex items-center justify-center"
            >
              Orders
            </a>
            <a
              href="#"
              className="text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg flex items-center justify-center"
            >
              Services
            </a>

          </div>
        )}
        {/* Desktop menu */}
        <div className="hidden md:flex flex-col md:flex-row  md:space-x-2 md:items-center justify-center">
          <a
            href="#"
            className="bg-white bg-opacity-10 text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg"
          >
            Home
          </a>
          <a
            href="#"
            className="bg-opacity-10 text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg"
          >
            Menu
          </a>
          <a
            href="#"
            className="bg-opacity-10 text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg"
          >
            Orders
          </a>
          <a
            href="#"
            className="bg-opacity-10 text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg"
          >
            Services
          </a>
          
        </div>
        <div className="flex flex-row mt-1 md:mt-0 md:ml-4 gap-2">
          <div className="flex items-center justify-center p-2 rounded-full border-2 border-white text-2xl text-white">
            <AiOutlineShopping />
          </div>
          <div className="flex items-center justify-center p-2 rounded-full border-2 bg-white text-2xl text-black">
            <FaRegHeart />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
