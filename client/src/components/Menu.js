import React, { useState } from 'react';

const Menu = () => {
  // Sample data for the grid
  const data = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Fried Drum Sticks (2pcs) ${i + 1}`,
    image: `chicken2.png`, // Replace with your image source
  }));

  // Set items per page
  const itemsPerPage = 9;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data array to get items for the current page
  const currentItems = data.slice(startIndex, endIndex);

  // Function to handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="menu-container w-full h-full md:h-full overflow-y-auto" style={{ height: '450px', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
        <div className="menu-content flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 mx-4 ">
            {currentItems.map((item) => (
              <div key={item.id} className="card-container bg-white bg-opacity-10 flex flex-col items-center p-2 text-center rounded-lg backdrop-blur-md md:w-60 h-54 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="mb-2 w-full h-32 object-cover rounded-t-md"
                />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination links */}
      <div className="flex justify-center mt-4">
        <div className="flex rounded-lg bg-white bg-opacity-20 backdrop-blur-md">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
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
