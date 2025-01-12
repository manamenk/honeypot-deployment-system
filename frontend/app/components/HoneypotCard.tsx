import { useState } from 'react'
import React from 'react';


export const HoneypotCard = ({ honeypot, onViewLogs }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-beartrap-yellow text-beartrap-black p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-xl font-semibold mb-2">{honeypot.type} Honeypot</h2>
      <p className="mb-4">Location: {honeypot.location}</p>
      <button
        onClick={() => onViewLogs(honeypot)}
        className={`bg-beartrap-black text-beartrap-yellow px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        View Logs
      </button>
    </div>
  )
}

