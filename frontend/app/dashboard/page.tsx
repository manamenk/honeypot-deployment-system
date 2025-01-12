'use client';

import React, { useEffect, useState } from "react";
import { HoneypotCard } from "../components/HoneypotCard";
import { NewHoneypotModal } from "../components/NewHoneypotModal";
import { LogsModal } from "../components/LogsModal";
import axios from "axios";

const DashboardPage = () => {
  const [honeypots, setHoneypots] = useState([]);
  const [selectedHoneypot, setSelectedHoneypot] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  useEffect(() => {
    const fetchHoneypots = async () => {
      const response = await axios.get("http://backend:5000/honeypots");
      setHoneypots(response.data.honeypots);
    };
    fetchHoneypots();
  }, []);

  const handleAddHoneypot = (newHoneypot) => {
    setHoneypots([...honeypots, newHoneypot]);
  };

  const handleViewLogs = async (honeypot) => {
    try {
      const response = await axios.get(
        `http://backend:5000/logs/${honeypot.id}`
      );
      setSelectedHoneypot({ ...honeypot, logs: response.data.logs });
    } catch (error) {
      console.error("Error fetching logs:", error.response?.data?.error);
    }
  };

  const handleCloseLogs = () => setSelectedHoneypot(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Honeypots</h1>
        <button
          onClick={() => setShowNewModal(true)}
          className="bg-beartrap-yellow text-beartrap-black px-4 py-2 rounded"
        >
          New Honeypot
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {honeypots.map((honeypot) => (
          <HoneypotCard
            key={honeypot.id}
            honeypot={honeypot}
            onViewLogs={handleViewLogs}
          />
        ))}
      </div>
      {showNewModal && (
        <NewHoneypotModal
          onClose={() => setShowNewModal(false)}
          onHoneypotAdded={handleAddHoneypot}
        />
      )}
      {selectedHoneypot && (
        <LogsModal honeypot={selectedHoneypot} onClose={handleCloseLogs} />
      )}
    </div>
  );
};

export default DashboardPage;
