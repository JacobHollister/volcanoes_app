import { BrowserRouter as Router} from 'react-router-dom'

import AnimatedRoutes from './AnimatedRoutes';
import Navbar from './components/Navbar';

import './App.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
