import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const history = useHistory();

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img src="/bear-icon.svg" alt="BearTrap Logo" className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-8">BearTrap</h1>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;

