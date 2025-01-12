import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState('');

  // Handle login/logout functionality
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Function to deploy honeypot
  const deployHoneypot = async () => {
    try {
      const response = await fetch('http://localhost:5000/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'cowrie' }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error deploying honeypot');
    }
  };

  // Function to fetch logs
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/logs');
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      console.error(error);
      setLogs('Error fetching logs');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <header className="bg-white shadow-md p-4 mb-8">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="BearTrap Logo"
                  className="w-10 h-10 mr-2"
                />
                <h1 className="text-2xl font-bold">BearTrap</h1>
              </div>
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </header>
          <main className="container mx-auto px-4">
            <Dashboard />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h2 className="text-xl font-bold">Honeypot Controls</h2>
              <button
                onClick={deployHoneypot}
                style={{ margin: '10px', padding: '10px' }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Deploy Honeypot
              </button>
              <p>{message}</p>
              <button
                onClick={fetchLogs}
                style={{ margin: '10px', padding: '10px' }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Fetch Logs
              </button>
              <pre
                style={{
                  backgroundColor: '#f4f4f4',
                  padding: '10px',
                  marginTop: '20px',
                }}
              >
                {logs}
              </pre>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
