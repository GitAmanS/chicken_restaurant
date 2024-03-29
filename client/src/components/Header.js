import React, { useState, useEffect } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaRegHeart } from 'react-icons/fa';
import './fonts.css';
import { GrBladesVertical } from "react-icons/gr";
import { GrBladesHorizontal } from "react-icons/gr";
import { useSpring, animated } from 'react-spring';
import {useUser} from '../context/UserContext'
import { FaSignOutAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from 'axios';
const Header = () => {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const { userData, logoutUser, addToCart, removeFromCart, cart, cartTotal } = useUser();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log('Submitted:', address);
    // Clear form fields after submission
    setAddress({
      street: '',
      city: '',
      postalCode: '',
      country: ''
    });
    closeAddressModal();
    handleCheckout();
  };

  const openAddressModal = () => {
    setAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setAddressModalOpen(false);
  };

  

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
    setMenuOpen(false); // Close menu when opening cart
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const cartAnimation = useSpring({
    transform: isCartOpen ? 'translateX(0%)' : 'translateX(100%)',
    opacity: isCartOpen ? 1 : 0,
  });


	const initPayment = (data) => {
    console.log(data.amount)
		const options = {
			key: "rzp_test_wud5i0vu3P18BR",
			amount: data.amount,
			currency: data.currency,
			name: "test name",
			description: "Test Transaction",
			order_id: data.id,
			handler: async (response) => {
				try {
          console.log("response", response)
					const  data  = await axios.post("http://localhost:5000/api/paymentverification", {response, address}, {
            withCredentials: true,
          });
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};
  
  const handleCheckout = async ()=>{
    try{
      const response = await axios.get('http://localhost:5000/api/checkout', {
        withCredentials: true,
      });
      console.log(response.data.order)
      initPayment(response.data.order);

    }catch(error){
      console.log(error)
    }
  }


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
            <Link 
              to="/"
              className="text-white py-3 px-6 rounded-full bg-amber-500 bg-opacity-10 backdrop-blur-3xl poppins-regular text-lg flex items-center justify-center"
            >
              Home
            </Link>
            <Link 
              to="/menu"
              className="text-white py-3 px-6 rounded-full bg-amber-500 bg-opacity-10 backdrop-blur-3xl poppins-regular text-lg flex items-center justify-center"
            >
              Menu
            </Link>
            <Link 
              to="/orders"
              className="text-white py-3 px-6 rounded-full bg-amber-500 bg-opacity-10 backdrop-blur-3xl poppins-regular text-lg flex items-center justify-center"
            >
              Orders
            </Link>
            <Link 
              to="/services"
              className="text-white py-3 px-6 rounded-full bg-amber-500 bg-opacity-10 backdrop-blur-3xl poppins-regular text-lg flex items-center justify-center"
            >
              Services
            </Link>
            </div>
        )}
        {/* Desktop menu */}
        <div className="hidden md:flex flex-col md:flex-row  md:space-x-2 md:items-center justify-center">
          <Link 
            to="/"
            className="bg-white bg-opacity-10 text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg"
          >
            Home
          </Link>
          <Link 
            to="/menu"
            className="bg-opacity-10 text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg"
          >
            Menu
          </Link>
          <Link 
            to="/orders"
            className="bg-opacity-10 text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg"
          >
            Orders
          </Link>
          <Link 
            to="/services"
            className="bg-opacity-10 text-white py-3 px-6 rounded-full backdrop-blur-3xl poppins-regular text-lg"
          >
            Services
          </Link>
          
        </div>
        {userData?        <div className="flex flex-row mt-1 md:mt-0 md:ml-4 gap-2">
        <div className="relative">
          <div
            className="flex items-center justify-center p-2 rounded-full border-2 border-white text-2xl text-white cursor-pointer"
            onClick={toggleCart}
          >
            <AiOutlineShopping />
          </div>
          {cart.length > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 py-0 text-xs">
              {cart.length}
            </div>
          )}
        </div>
          <div onClick={logoutUser} className="flex items-center justify-center p-2 rounded-full border-2 bg-white text-2xl text-black ">
            <IoIosLogOut />
          </div>

          {/* Cart Slider */}
          <animated.div
            className="flex flex-col fixed top-0 right-0 h-screen w-3/4 md:w-1/4 bg-white p-4 z-10"
            style={cartAnimation}
          >
            {/* Cart content goes here */}
            <div className='flex gap-4 items-center mb-2'>
            <h2 className="text-lg font-bold ">Your Cart</h2>
            <button className="text-xl ml-auto" onClick={toggleCart}>X</button>
            </div>
            
            {/* Sample cart items */}
            {!cart?<div>No Item Inside cart</div>:(cart.map((item)=>{
              return <div key={item._id} className="flex flex-row w-full items-center ">
                
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-12 h-12 object-cover rounded-md"
                />
                <p className='flex top-0 right- mb-auto mr-auto bg-black py-0 p-1 rounded-full bg-opacity-30 backdrop-blur-md text-white'>{item.quantity}</p>


                
                <div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  
                </div>

                <button className='flex ml-auto text-red-600' onClick={()=>{removeFromCart(item)}}>
                  X
                </button>
              </div>
            }))}

            {/* Additional cart items can be added here */}
            <div className='flex flex-col mt-auto '>
              <h1 className='text-xl mb-3'>
                Total: ${cartTotal.toFixed(2)}
              </h1>
              <button
                className=" bg-green-500 text-white px-6 py-2 rounded-md "
                onClick={openAddressModal}
              >
                Proceed to Checkout
              </button>
            </div>

          </animated.div>
        </div>:
        <div className='flex flex-row mt-1 md:mt-0 md:ml-4 gap-2'>
          <Link to="/auth"  className="flex items-center justify-center p-2 rounded-full border-2 bg-white text-3xl text-black ">
            <FaSignOutAlt />
          </Link>

        </div>}
      </div>

      {isAddressModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
          <div className='bg-white p-8 rounded-lg'>
            <h2 className='text-xl font-bold mb-4'>Enter Your Address</h2>
            <form onSubmit={handleSubmit}>
              <label className='block mb-2'>
                Street:
                <input type="text" name="street" value={address.street} onChange={handleChange} className='border border-gray-300 rounded-md px-2 py-1 w-full mt-1' />
              </label>
              <label className='block mb-2'>
                City:
                <input type="text" name="city" value={address.city} onChange={handleChange} className='border border-gray-300 rounded-md px-2 py-1 w-full mt-1' />
              </label>
              <label className='block mb-2'>
                Postal Code:
                <input type="text" name="postalCode" value={address.postalCode} onChange={handleChange} className='border border-gray-300 rounded-md px-2 py-1 w-full mt-1' />
              </label>
              <label className='block mb-2'>
                Country:
                <input type="text" name="country" value={address.country} onChange={handleChange} className='border border-gray-300 rounded-md px-2 py-1 w-full mt-1' />
              </label>
              <button type="submit" className='bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600'>Checkout</button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
