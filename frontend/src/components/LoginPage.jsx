import React from 'react';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-center mb-6">
          <img src="/placeholder.svg?height=80&width=80" alt="BearTrap Logo" className="w-20 h-20" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">BearTrap</h1>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-yellow-400">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-yellow-400 text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-yellow-400">Password</label>
            <input type="password" id="password" name="password" required className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-yellow-400 text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500" />
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-200">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

