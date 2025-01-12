import React from 'react';


export const LogsModal = ({ honeypot, onClose }) => {
    const dummyLogs = [
      { timestamp: '2023-05-01 10:30:15', event: 'Connection attempt from 192.168.1.100' },
      { timestamp: '2023-05-01 10:31:22', event: 'Failed login attempt: username "admin"' },
      { timestamp: '2023-05-01 10:32:05', event: 'Payload attempted: known exploit CVE-2023-1234' },
    ]
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-beartrap-black text-beartrap-yellow p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Logs for {honeypot.type} Honeypot ({honeypot.location})</h2>
          <div className="bg-beartrap-yellow text-beartrap-black p-4 rounded-lg mb-4 h-64 overflow-y-auto">
            {dummyLogs.map((log, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold">{log.timestamp}</span>: {log.event}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} className="bg-beartrap-yellow text-beartrap-black px-4 py-2 rounded hover:bg-opacity-80 transition-all duration-300 ease-in-out">
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  