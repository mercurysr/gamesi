import React, { useState } from 'react';
import styled from 'styled-components';
// 1. ADICIONADO O 'Link' DO REACT ROUTER ELE QUE VAI FAZER A TROCA DE TELA
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
`;

const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  margin: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box; /* Garante que o padding não afete a largura final */
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #6a11cb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2575fc;
  }
`;

const LinkWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

// 2. O STYLEDLINK AGORA APLICA ESTILOS AO COMPONENTE 'Link'
const StyledLink = styled(Link)`
  color: #6a11cb;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// 3. REMOVIDA A PROP 'onNavigateToRegister'
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login realizado com sucesso!");
      // O App.js cuidará do redirecionamento
    } catch (error) {
      console.error("Erro ao fazer login: ", error.message);
      alert("E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Entrar</Button>
        </form>
        <LinkWrapper>
          Não tem uma conta?{' '}
          {/* 4. AGORA USAMOS A PROP 'to' PARA DEFINIR A ROTA DE CADASTRO */}
          <StyledLink to="/register">Cadastre-se</StyledLink>
        </LinkWrapper>
      </FormWrapper>
    </Container>
  );
};

export default LoginScreen;