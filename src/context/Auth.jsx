import { createContext, useContext, useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';


const AuthContext = createContext();


function AuthProvider({ children }) {
    const [error, setError] = useState("")
    const [user, setUser] = useState(() => {
    const token = Cookies.get('token');
    return token ? { token } : null;
  });

const login = async (username, password) => {
  try {
    const response = await axios.post('https://localhost:7107/api/Auth/login', {
      username,
      password
    });
    const data = response.data;
    Cookies.set('token', data.token)
    setUser({ token: data.token });
    setError("")
    return true;
  } catch (error) {
     setError("Username or password are incorrect")
    return false;
  }
};


  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError}}>
      {children}
    </AuthContext.Provider>
  );
}


export {AuthProvider}

export function useAuth() {
  return useContext(AuthContext);
}

