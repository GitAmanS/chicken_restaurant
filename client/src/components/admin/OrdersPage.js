import React, { useState } from 'react';

// Dummy data for orders
const dummyOrders = [
  { id: 1, itemName: 'Burger', status: 'Unprocessed' },
  { id: 2, itemName: 'Pizza', status: 'Processed' },
  { id: 3, itemName: 'Salad', status: 'Unprocessed' },
  // Add more dummy orders as needed
];

const OrdersPage = () => {
  // State to store orders
  const [orders, setOrders] = useState(dummyOrders);

  // Function to process an order
  const processOrder = (id) => {
    setOrders(
      orders.map(order => 
        order.id === id ? { ...order, status: 'Processed' } : order
      )
    );
  };

  // Function to deliver an order
  const deliverOrder = (id) => {
    setOrders(
      orders.map(order => 
        order.id === id ? { ...order, status: 'Delivered' } : order
      )
    );
  };

  // Separate processed and unprocessed orders
  const unprocessedOrders = orders.filter(order => order.status === 'Unprocessed');
  const processedOrders = orders.filter(order => order.status === 'Processed');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      {/* Unprocessed Orders */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Unprocessed Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unprocessedOrders.map(order => (
            <div key={order.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{order.itemName}</h3>
                <p className="text-gray-600">{order.status}</p>
              </div>
              <div className="bg-gray-100 p-4 flex justify-end">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
                  onClick={() => processOrder(order.id)}
                >
                  Process
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processed Orders */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Processed Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processedOrders.map(order => (
            <div key={order.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{order.itemName}</h3>
                <p className="text-gray-600">{order.status}</p>
              </div>
              <div className="bg-gray-100 p-4 flex justify-end">
                {order.status === 'Processed' && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
                    onClick={() => deliverOrder(order.id)}
                  >
                    Deliver
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
