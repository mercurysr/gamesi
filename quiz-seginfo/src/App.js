import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css'; 
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Dashboard from './Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // "Ouvinte" do Firebase: ele atualiza o 'user' sempre que alguém loga ou desloga.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Limpeza ao desmontar o componente
  }, []);

  // Mostra uma tela de carregamento enquanto o Firebase verifica a autenticação
  if (loading) {
    return <div className="App-header">Carregando...</div>;
  }

  // Lógica de rotas que substitui o 'useState' anterior
  return (
    <BrowserRouter>
      <Routes>
        {/* Se o usuário não estiver logado, a rota /login mostra o LoginScreen. 
            Se estiver logado, redireciona para a página inicial (/). */}
        <Route 
          path="/login" 
          element={!user ? <LoginScreen /> : <Navigate to="/" />} 
        />
        
        {/* Lógica similar para a tela de cadastro */}
        <Route 
          path="/register" 
          element={!user ? <RegisterScreen /> : <Navigate to="/" />} 
        />
        
        {/* A página inicial (/) mostra o Dashboard se o usuário estiver logado.
            Caso contrário, redireciona para /login. */}
        <Route 
          path="/" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;