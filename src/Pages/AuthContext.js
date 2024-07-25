import { createContext, useContext, useState, useEffect } from 'react';
 
const AuthContext = createContext();
 
export function AuthProvider({ children }) {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || '');
  const [role, setRole] = useState(localStorage.getItem('role') ||'')
 
  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);
 
  return (
    <AuthContext.Provider value={{  jwt, setJwt, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  return useContext(AuthContext);
}