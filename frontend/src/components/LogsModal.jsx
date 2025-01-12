import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogsModal = ({ honeypot, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/logs?honeypotId=${honeypot.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      } else {
        console.error('Failed to fetch logs');
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Logs for {honeypot.name}</h3>
        {loading ? (
          <p>Loading logs...</p>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                <p className="text-sm">{log.timestamp}: {log.message}</p>
              </div>
            ))}
          </div>
        )}
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

export default LogsModal;

