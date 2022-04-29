import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"

import Login from './pages/Login';
import Register from './pages/Register';
import Volcanoes from './pages/Volcanoes';
import Volcano from './pages/Volcano';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/volcanoes' element={ <Volcanoes />}/>
        <Route path='/volcano/:id' element={ <Volcano />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </Router>
  );
}

export default App;
