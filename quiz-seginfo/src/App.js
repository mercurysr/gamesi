import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

function App() {
  // 'login' ou 'register'
  const [currentScreen, setCurrentScreen] = useState('login');

  const showLogin = () => setCurrentScreen('login');
  const showRegister = () => setCurrentScreen('register');

  return (
    <div>
      {currentScreen === 'login' ? (
        <LoginScreen onNavigateToRegister={showRegister} />
      ) : (
        <RegisterScreen onNavigateToLogin={showLogin} />
      )}
    </div>
  );
}

export default App;