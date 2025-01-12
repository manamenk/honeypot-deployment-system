import React, { useState } from 'react';
import HoneypotCard from './HoneypotCard';
import NewHoneypotModal from './NewHoneypotModal';

const Dashboard = () => {
  const [honeypots, setHoneypots] = useState([
    { id: 1, name: 'Honeypot 1', type: 'Cowrie', status: 'Active', location: 'US-East' },
    { id: 2, name: 'Honeypot 2', type: 'Dionaea', status: 'Inactive', location: 'EU-West' },
  ]);
  const [showNewHoneypotModal, setShowNewHoneypotModal] = useState(false);

  const handleNewHoneypot = async (honeypotData) => {
    try {
      const response = await fetch('http://localhost:5000/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: honeypotData.type }),
      });
      const data = await response.json();
      console.log(data.message);
      setShowNewHoneypotModal(false);
    } catch (error) {
      console.error('Error deploying honeypot:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-yellow-400">Your Honeypots</h2>
        <button
          onClick={() => setShowNewHoneypotModal(true)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded transition duration-200"
        >
          New Honeypot
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {honeypots.map((honeypot) => (
          <HoneypotCard key={honeypot.id} honeypot={honeypot} />
        ))}
      </div>
      {showNewHoneypotModal && (
        <NewHoneypotModal
          onClose={() => setShowNewHoneypotModal(false)}
          onSubmit={handleNewHoneypot}
        />
      )}
    </div>
  );
};

export default Dashboard;

