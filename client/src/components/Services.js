import React from 'react';

const Services = () => {
  return (
    <div lassName="container w-full h-full md:h-full overflow-y-auto" style={{ height: '450px', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white bg-opacity-10 backdrop-blur-3xl rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Service 1</h2>
          <p className="text-gray-600">Description of Service 1</p>
        </div>
        {/* Card 2 */}
        <div className="bg-white bg-opacity-10 backdrop-blur-3xl rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Service 2</h2>
          <p className="text-gray-600">Description of Service 2</p>
        </div>
        {/* Card 3 */}
        <div className="bg-white bg-opacity-10 backdrop-blur-3xl rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Service 3</h2>
          <p className="text-gray-600">Description of Service 3</p>
        </div>
        {/* Card 4 */}
        <div className="bg-white bg-opacity-10 backdrop-blur-3xl rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Service 4</h2>
          <p className="text-gray-600">Description of Service 4</p>
        </div>
        
      </div>
    </div>
  );
};

export default Services;
