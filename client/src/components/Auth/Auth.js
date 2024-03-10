import React, { useState } from 'react';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    // For simplicity, we'll just set a dummy success state
    setLoginSuccess(true);
  };

  const handleSignup = () => {
    // Implement your signup logic here
    // For simplicity, we'll just set a dummy success state
    setLoginSuccess(true);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="bg-white bg-opacity-10 rounded-lg backdrop-blur-md p-8 rounded shadow-md w-full md:w-96">
        <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
          <button
            className={`${
              activeTab === 'login'
                ? 'bg-blue-500 hover:bg-blue-700'
                : 'bg-gray-300 hover:bg-gray-400'
            } rounded-full text-white font-bold py-2 px-4 focus:outline-none mb-2 md:mb-0 md:mr-2`}
            type="button"
            onClick={() => switchTab('login')}
          >
            Login
          </button>
          <button
            className={`${
              activeTab === 'signup'
                ? 'bg-green-500 hover:bg-green-700'
                : 'bg-gray-300 hover:bg-gray-400'
            } rounded-full text-white font-bold py-2 px-4 focus:outline-none`}
            type="button"
            onClick={() => switchTab('signup')}
          >
            Signup
          </button>
        </div>

        {activeTab === 'login' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
            <form className="text-white">
              <div className="mb-4">
                <label className="block mb-2">Username:</label>
                <input
                  className="border rounded w-full py-2 px-3 bg-gray-800 focus:outline-none"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password:</label>
                <input
                  className="border rounded w-full py-2 px-3 bg-gray-800 focus:outline-none"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </form>
          </div>
        )}

        {activeTab === 'signup' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Signup</h2>
            <form className="text-white">
              <div className="mb-4">
                <label className="block mb-2">Username:</label>
                <input
                  className="border rounded w-full py-2 px-3 bg-gray-800 focus:outline-none"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password:</label>
                <input
                  className="border rounded w-full py-2 px-3 bg-gray-800 focus:outline-none"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                type="button"
                onClick={handleSignup}
              >
                Signup
              </button>
            </form>
          </div>
        )}

        {isLoginSuccess && (
          <p className="text-green-500 mt-4">Welcome, {username}!</p>
        )}
      </div>
    </div>
  );
};

export default Auth;
