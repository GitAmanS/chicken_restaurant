import React, { useEffect, useState } from 'react';
import axios from 'axios';
// const dummyOrders = [
//   {
//     id: 1,
//     date: '2024-03-05',
//     products: [
//       { id: 101, name: 'Pizza', quantity: 2 },
//       { id: 102, name: 'Burger', quantity: 1 },
//     ],
//     total: 25.99,
//     status: 'Delivered',
//   },
//   {
//     id: 2,
//     date: '2024-03-04',
//     products: [
//       { id: 103, name: 'Salad', quantity: 1 },
//       { id: 104, name: 'Soda', quantity: 3 },
//     ],
//     total: 15.5,
//     status: 'Pending',
//   },
//   {
//     id: 3,
//     date: '2024-03-04',
//     products: [
//       { id: 103, name: 'Salad', quantity: 1 },
//       { id: 104, name: 'Soda', quantity: 3 },
//     ],
//     total: 15.5,
//     status: 'Pending',
//   },
//   // Add more dummy orders as needed
// ];


const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(()=>{
    const fetchOrders = async()=>{
      try{
        const response = await axios.get('http://localhost:5000/api/getAllOrders', {
          withCredentials: true,
        });
        setOrders(response.data.orders)
        console.log(response.data.orders)
      }catch(error){
        console.log(error)
      }
    }
    fetchOrders();
  }, [])
  
  return (
    <div className='flex flex-col h-full p-6 rounded-lg bg-white bg-opacity-20 backdrop-blur-3xl' style={{height:'550px',  scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
      <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className='flex-grow overflow-y-auto'>
          {orders.map((order) => (
            <li key={order._id} className='bg-white rounded-md p-4 shadow-md mb-4'>
              <div className='flex justify-between items-center mb-2'>
                <h3 className='text-lg font-semibold'>Order ID: {order._id}</h3>
                <span className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span>
              </div>
              <p className='text-gray-600 mb-2'>Date: {order.updatedAt}</p>
              <ul className='list-disc ml-6'>
                {order.items.map((product) => (
                  <li key={product.id}>
                    {product.name} - Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
              <p className='mt-4 text-xl font-semibold'>Total: ${order.totalPrice.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
