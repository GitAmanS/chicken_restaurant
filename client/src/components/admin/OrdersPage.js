import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('unprocessed');

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getAllOrders', {
          withCredentials: true,
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.log(error)
      }
    }

    getAllOrders();
  }, []);

  const processOrder = async (orderId) => {
    try {
      await axios.post('http://localhost:5000/api/updateOrderStatus', {
        orderId: orderId,
        newStatus: 'Processed'
      }, {
        withCredentials: true,
      });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: 'Processed' } : order
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await axios.post('http://localhost:5000/api/updateOrderStatus', {
        orderId: orderId,
        newStatus: 'Cancelled'
      }, {
        withCredentials: true,
      });
      setOrders(orders.filter(order =>
        order._id !== orderId
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const deliverOrder = async (orderId) => {
    try {
      await axios.post('http://localhost:5000/api/updateOrderStatus', {
        orderId: orderId,
        newStatus: 'Delivered'
      }, {
        withCredentials: true,
      });
      setOrders(orders.filter(order =>
        order._id !== orderId
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const unprocessedOrders = orders.filter(order => order.status === 'Pending' || order.status === 'Processed');
  const completedOrders = orders.filter(order => order.status === 'Delivered');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <div className="mb-8">
        <div className="flex mb-4">
          <button
            className={`mr-4 ${activeTab === 'unprocessed' ? 'font-semibold' : ''}`}
            onClick={() => setActiveTab('unprocessed')}
          >
            Unprocessed Orders
          </button>
          <button
            className={`mr-4 ${activeTab === 'completed' ? 'font-semibold' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Orders
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === 'unprocessed' && unprocessedOrders.map(order => (
  <div key={order._id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white mb-4">
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
      {order.items.map((item, index) => (
        <div key={index} className="mb-1">
          <p>{item.quantity} x {item.name}</p>
        </div>
      ))}
      <p className="text-gray-600 mb-2">Status: {order.status}</p>
      <p className="text-gray-600">Address: {order.address.street}, {order.address.city}, {order.address.postalCode}, {order.address.country}</p>
    </div>
    <div className="bg-gray-100 p-4 flex justify-between">
      {order.status === 'Pending' && (
        <>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2 transition duration-300"
            onClick={() => processOrder(order._id)}
          >
            Process
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
            onClick={() => cancelOrder(order._id)}
          >
            Cancel
          </button>
        </>
      )}
      {order.status === 'Processed' && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          onClick={() => deliverOrder(order._id)}
        >
          Deliver
        </button>
      )}
    </div>
  </div>
))}

          
          {activeTab === 'completed' && completedOrders.map(order => (
            <div key={order._id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
                {order.items.map((item, index) => (
                  <div key={index}>
                    <p>{item.quantity} x {item.name}</p>
                  </div>
                ))}
                <p className="text-gray-600">Status: {order.status}</p>
                <p className="text-gray-600">Address: {order.address.street}, {order.address.city}, {order.address.postalCode}, {order.address.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default OrdersPage;
