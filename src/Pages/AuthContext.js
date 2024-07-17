// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, jwt, setJwt }}>
      {children}
    </AuthContext.Provider> 
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
