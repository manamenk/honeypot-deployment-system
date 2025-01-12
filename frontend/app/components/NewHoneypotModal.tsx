import React, { useState } from "react";
import axios from "axios";

export const NewHoneypotModal = ({ onClose, onHoneypotAdded }) => {
  const [type, setType] = useState("SSH");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://backend:5000/deploy", {
        type,
        location,
      });
      onHoneypotAdded(response.data.honeypot);
      onClose();
    } catch (error) {
      console.error("Error deploying honeypot:", error.response?.data?.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-beartrap-black text-beartrap-yellow p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Honeypot</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block mb-1">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-beartrap-yellow text-beartrap-black p-2 rounded"
            >
              <option>SSH</option>
              <option>HTTP</option>
              <option>FTP</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-beartrap-yellow text-beartrap-black p-2 rounded"
              placeholder="e.g., US-East"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-opacity-80 transition-all duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-beartrap-yellow text-beartrap-black px-4 py-2 rounded hover:bg-opacity-80 transition-all duration-300 ease-in-out"
            >
              Add Honeypot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
