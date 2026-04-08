import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const usuariosMock = [
  { email: 'user@infnet.com', senha: '1234', nome: 'Apolo' },
  { email: 'admin@infnet.com', senha: 'admin', nome: 'Admin' },
];

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  function login(email, senha) {
    const encontrado = usuariosMock.find(
      (u) => u.email === email && u.senha === senha
    );
    if (encontrado) {
      setUsuarioLogado(encontrado);
      return true;
    }
    return false;
  }

  function logout() {
    setUsuarioLogado(null);
  }

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}