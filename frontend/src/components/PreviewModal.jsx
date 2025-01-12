import React, { useState, useEffect } from 'react';

const PreviewModal = ({ honeypot, onClose }) => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    // Simulate real-time activity
    const interval = setInterval(() => {
      setActivity(prevActivity => [
        ...prevActivity,
        {
          id: Date.now(),
          type: ['SSH attempt', 'HTTP request', 'FTP connection'][Math.floor(Math.random() * 3)],
          ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
          timestamp: new Date().toISOString()
        }
      ].slice(-5)); // Keep only the last 5 activities
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Preview: {honeypot.name}</h3>
        <div className="mb-4">
          <p><strong>Type:</strong> {honeypot.type}</p>
          <p><strong>Location:</strong> {honeypot.location}</p>
          <p><strong>Status:</strong> {honeypot.status}</p>
        </div>
        <div className="border rounded-md p-4 bg-gray-100">
          <h4 className="font-semibold mb-2">Live Activity</h4>
          {activity.map(item => (
            <div key={item.id} className="mb-2 p-2 bg-white rounded shadow">
              <p>{item.timestamp} - {item.type} from {item.ip}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;

