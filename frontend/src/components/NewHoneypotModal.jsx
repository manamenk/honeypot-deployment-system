import React, { useState } from 'react';

const NewHoneypotModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-8 border border-gray-800 w-96 shadow-lg rounded-lg bg-gray-900">
        <h3 className="text-2xl font-bold mb-4 text-yellow-400">Deploy New Honeypot</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-yellow-400 text-sm font-bold mb-2" htmlFor="type">
              Honeypot Type
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-yellow-400 leading-tight focus:outline-none focus:shadow-outline focus:border-yellow-500"
              required
            >
              <option value="">Select a type</option>
              <option value="Cowrie">Cowrie</option>
              <option value="Dionaea">Dionaea</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-yellow-400 text-sm font-bold mb-2" htmlFor="location">
              Deployment Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-800 text-yellow-400 leading-tight focus:outline-none focus:shadow-outline focus:border-yellow-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded transition duration-200"
            >
              Deploy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewHoneypotModal;

