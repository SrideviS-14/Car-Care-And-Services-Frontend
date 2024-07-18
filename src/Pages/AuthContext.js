// AuthContext.js
import { createContext, useContext, useState } from 'react';
 
const AuthContext = createContext();
 
export function AuthProvider({ children }) {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || '');
 
  return (
    <AuthContext.Provider value={{  jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  return useContext(AuthContext);
}