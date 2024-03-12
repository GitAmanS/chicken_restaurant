import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
const Menu = () => {
  const { addToCart } = useUser();
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        const data = await response.data;
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = menuItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCart = (item) => {
    addToCart(item);
  };

  return (
    <>
      <div className="menu-container w-full h-full md:h-full overflow-y-auto" style={{ height: '450px', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
        <div className="menu-content flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-4 mx-auto ">
            {currentItems.map((item) => (
              <div key={item._id} className="card-container bg-white bg-opacity-10 flex flex-col items-center p-2 text-center rounded-lg backdrop-blur-md md:w-60 h-54 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="mb-2 w-full h-32 object-cover rounded-t-md"
                />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <button onClick={() => { handleCart(item) }} className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination links */}
      <div className="flex justify-center mt-4">
        <div className="flex rounded-lg bg-white bg-opacity-20 backdrop-blur-md">
          {Array.from({ length: Math.ceil(menuItems.length / itemsPerPage) }, (_, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded cursor-pointer ${i + 1 === currentPage ? 'bg-amber-500 text-black' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
