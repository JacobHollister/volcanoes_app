import { Routes, Route, useLocation } from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register';
import Volcanoes from './pages/Volcanoes';
import Volcano from './pages/Volcano';
import Home from './pages/Home';

import { AnimatePresence } from "framer-motion"

export default function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence exitBeforeEnter>
            
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={ <Home />}/>
                <Route path='/volcanoes' element={ <Volcanoes />}/>
                <Route path='/volcano/:id' element={ <Volcano />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
            </Routes>
        </AnimatePresence>
    )
}
