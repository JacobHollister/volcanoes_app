import { BrowserRouter as Router} from 'react-router-dom'

import AnimatedRoutes from './AnimatedRoutes';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
      <Router>
        <Navbar/>
        <AnimatedRoutes />
      </Router>
  );
}

export default App;
