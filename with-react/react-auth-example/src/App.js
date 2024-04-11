import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Profile from './Profile';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token'); // Удаление токена из локального хранилища при выходе
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Profile onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
