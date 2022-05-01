import { Link, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import transition from "../utils/transition"

export default function Navbar() {
    const location = useLocation().pathname
    const navigate = useNavigate()

    const isVisible = ['/', '/login', '/register'].includes(location)

    return (
        <AnimatePresence>
            { !isVisible && (
            <motion.div 
                className="h-11 w-screen content-center fixed bg-slate-50 z-10 flex justify-center border-2 border-slate-200"
                initial={{transform: "translateY(-100%)"}}
                animate={{transform: "translateY(0%)", transition: transition(1.3)}}
                exit={{transform: "translateY(-100%)", transition: transition(0)}}
                transition={transition()}>
                    <ul className="flex items-center font-medium" style={{width: "800px"}}>
                        <li className="mr-6">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="mr-6">
                            <Link to="/volcanoes">Volcano List</Link>
                        </li>
                        <li className="mr-2 ml-auto">
                            <button 
                            className="bg-transparent hover:bg-blue-500  font-medium text-blue-700 hover:text-white py-1 px-2 w-22 border border-blue-500 hover:border-transparent rounded h-8"
                            onClick={() => navigate('/register')}
                            >
                                Register
                            </button>
                        </li>
                        <li className="mr-2">
                            <button 
                            className="bg-blue-500 hover:bg-blue-700 font-medium text-white py-1 px-4 rounded h-8 w-22"
                            onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                        </li>
                </ul>
            </motion.div>)
            }
        </AnimatePresence>
    )
}