import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsersGear } from "react-icons/fa6";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineFoodBank } from "react-icons/md";
import { useUser } from '../../context/UserContext';

const AdminPanel = ({ element }) => {
  const { logoutUser, userData } = useUser();

  return (
    <>
      {userData ? (
        <div className="flex h-screen bg-black">
          {/* Sidebar */}
          <nav className="fixed top-0 h-screen w-64 bg-black flex flex-col justify-between p-4">
            <h1 className='text-white my-6 px-4 text-xl font-bold'>Admin Panel</h1>
            <div className="flex flex-col space-y-2 mb-auto">
              <Link to="/admin" className="text-white text-lg font-semibold hover:bg-zinc-900 py-3 px-4 rounded-xl transition duration-300">
                <div className='flex flex-row items-center'>
                  <FaUsersGear className='mr-2'/>Users
                </div>
              </Link>
              <Link to="/admin/items" className="text-white text-lg font-semibold hover:bg-zinc-900 py-3 px-4 rounded-xl transition duration-300">
                <div className='flex flex-row items-center'>
                  <BiFoodMenu className='mr-2'/>Menu
                </div>
              </Link>
              <Link to="/admin/orders" className="text-white text-lg font-semibold hover:bg-zinc-900 py-3 px-4 rounded-xl transition duration-300">
                <div className='flex flex-row items-center'>
                  <MdOutlineFoodBank className='mr-2'/>Orders
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-center"> {/* Optional bottom navigation */}
              <div onClick={logoutUser} className="text-white text-lg font-semibold hover:bg-zinc-900 py-3 px-4 rounded-xl transition duration-300">Logout</div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="ml-64 flex-grow px-8 py-6 bg-gray-50 overflow-y-auto">
            {element}
          </div>
        </div>
      ) : (
        <div>Not Authorized</div>
      )}
    </>
  );
};

export default AdminPanel;
