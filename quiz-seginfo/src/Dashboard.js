// src/Dashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa o Link para navegação
import { db, auth } from './firebase';
import { collection, doc, getDocs, getDoc, orderBy, query } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';

// --- Styled Components ---
const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d32f2f;
  }
`;

const ModuloGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
`;

const ModuloCard = styled(Link)` // O Card agora é um Link
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProgressBarContainer = styled.div`
  background: #e0e0e0;
  border-radius: 5px;
  height: 10px;
  margin-top: 15px;
`;

const ProgressBar = styled.div`
  width: ${props => props.progress || 0}%;
  background: #4caf50;
  height: 100%;
  border-radius: 5px;
`;


// --- Componente ---
const Dashboard = () => {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Buscar os dados do usuário logado (incluindo o progresso)
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.exists() ? userDocSnap.data() : {};
        const userProgress = userData.progresso || {};

        // 2. Buscar todos os módulos, ordenados pelo campo 'ordem'
        const modulosQuery = query(collection(db, "modulos"), orderBy("ordem"));
        const querySnapshot = await getDocs(modulosQuery);
        
        // 3. Combinar os dados: para cada módulo, adicionar o progresso do usuário
        const modulosData = querySnapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(),
            progresso: userProgress[doc.id] || 0, // Pega o progresso ou define 0
        }));

        setModulos(modulosData);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <DashboardContainer>
      <Header>
        <h1>Módulos de Aprendizagem</h1>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </Header>
      
      <ModuloGrid>
        {modulos.map(modulo => (
          // Cada card agora é um link para a página daquele módulo
          <ModuloCard key={modulo.id} to={`/modulo/${modulo.id}`}>
            <h2>{modulo.titulo}</h2>
            <p>{modulo.descricao}</p>
            <ProgressBarContainer>
                <ProgressBar progress={modulo.progresso} />
            </ProgressBarContainer>
          </ModuloCard>
        ))}
      </ModuloGrid>
    </DashboardContainer>
  );
};

export default Dashboard;