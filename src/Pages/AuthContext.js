// AuthContext.js
import { createContext, useContext, useState } from 'react';
 
const AuthContext = createContext();
 
export function AuthProvider({ children }) {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || '');
  const [role, setRole] = useState('')
 
  return (
    <AuthContext.Provider value={{  jwt, setJwt, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  return useContext(AuthContext);
}