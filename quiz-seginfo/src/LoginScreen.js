import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// --- Styled Components ---

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

const StyledLink = styled.a`
  color: #6a11cb;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// --- Componente React ---

const LoginScreen = ({ onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔽 2. TRANSFORME A FUNÇÃO EM 'async'
  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔽 3. USE O try/catch
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login realizado com sucesso!", userCredential.user);
      alert("Login bem-sucedido!");
      // Aqui, você normalmente redirecionaria o usuário para a página principal do app
      
    } catch (error) {
      console.error("Erro ao fazer login: ", error.message);
      // Para erros de login, o Firebase costuma retornar 'auth/invalid-credential'
      // para evitar que alguém descubra se um e-mail existe ou não.
      alert("E-mail ou senha inválidos. Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          {/* Inputs não mudam */}
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
          <StyledLink onClick={onNavigateToRegister}>Cadastre-se</StyledLink>
        </LinkWrapper>
      </FormWrapper>
    </Container>
  );
};

export default LoginScreen;