import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

// --- Styled Components (Reutilizando alguns do Login) ---

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #2575fc, #6a11cb);
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
  box-sizing: border-box;
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

const RegisterScreen = ({ onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔽 2. TRANSFORME A FUNÇÃO EM 'async' PARA USAR O 'await'
  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔽 3. USE O try/catch PARA TRATAR SUCESSO E ERRO
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
      nome: name, // O 'name' vem do estado do seu componente
    }, { merge: true }); // 'merge: true' garante que não vamos apagar os outros campos
      console.log("Usuário cadastrado com sucesso!", userCredential.user);
      alert(`Conta para ${name} criada com sucesso!`);
      // Aqui você pode redirecionar o usuário ou limpar o formulário
      
    } catch (error) {
      console.error("Erro ao cadastrar: ", error.message);
      // Mostra um alerta amigável para o usuário
      if (error.code === 'auth/email-already-in-use') {
        alert("Este e-mail já está em uso. Tente outro.");
      } else if (error.code === 'auth/weak-password') {
        alert("A senha é muito fraca. Ela deve ter pelo menos 6 caracteres.");
      } else {
        alert("Ocorreu um erro ao criar a conta. Tente novamente.");
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Crie sua Conta</Title>
        <form onSubmit={handleRegister}>
          {/* Inputs não mudam */}
          <Input
            type="text"
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Crie uma senha forte"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Cadastrar</Button>
        </form>
        <LinkWrapper>
          Já tem uma conta?{' '}
          <StyledLink onClick={onNavigateToLogin}>Faça Login</StyledLink>
        </LinkWrapper>
      </FormWrapper>
    </Container>
  );
};

export default RegisterScreen;