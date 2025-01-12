import React from 'react';

const HoneypotCard = ({ honeypot }) => {
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/logs');
      const data = await response.json();
      console.log(data.logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div className="bg-gray-900 shadow-lg rounded-lg p-6 border border-gray-800 hover:border-yellow-500 transition duration-300">
      <h3 className="text-xl font-semibold mb-2 text-yellow-400">{honeypot.name}</h3>
      <p className="text-gray-400 mb-4">Type: {honeypot.type}</p>
      <p className="text-gray-400 mb-4">Location: {honeypot.location}</p>
      <div className="flex items-center mb-4">
        <span
          className={`inline-block w-3 h-3 rounded-full mr-2 ${
            honeypot.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
          }`}
        ></span>
        <span className="text-gray-300">{honeypot.status}</span>
      </div>
      <div className="flex justify-between">
        <button
          onClick={fetchLogs}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded transition duration-200"
        >
          View Logs
        </button>
      </div>
    </div>
  );
};

export default HoneypotCard;

