import Home from './components/views/home';
import Login from './components/views/login';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {useAuth, AuthProvider} from './context/Auth'



function App() {
  
  function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
