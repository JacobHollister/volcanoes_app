import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion} from "framer-motion"

import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"

import transition from "../utils/transition"

import volcano_light from "../assets/volcano_light_1.jpg"
import { useState } from "react"

export default function Home () {
    const navigate = useNavigate()

    const [actionContent, setActionContent] = useState('home')
    const [loginVisible, setLoginVisible] = useState(false)
    const [registerVisible, setRegisterVisible] = useState(false)
    const [contentSize, setContentSize] = useState("200px")

    const showLoginForm = () => {
        setContentSize("500px")
        setLoginVisible(true)
        setActionContent('login')
    }

    const showRegisterForm = () => {
        setContentSize("500px")
        setRegisterVisible(true)
        setActionContent('register')
    }

    const closeFormHandler = () => {
        setContentSize("200px")
        setLoginVisible(false)
        setActionContent('home')
    }

    const guestButtonHandler = () => {
        setLoginVisible(false)
        setActionContent(null)
        navigate("/volcanoes")
    }

    let formContainer;

    if( actionContent === "register" ){
        formContainer = (<RegisterForm close={closeFormHandler} isVisible={registerVisible}/>)
    } else if ( actionContent === 'login' ) {
        formContainer = (<LoginForm close={closeFormHandler} isVisible={loginVisible}/>)
    } else if ( actionContent === 'home' ){
        formContainer = (                    
            <motion.div 
                key="splashButtons"            
                className="flex flex-col"
                initial={{opacity: 0}}
                animate={{opacity: 1, transition: transition(1)}}
                exit={{opacity: 0, transition: transition(0)}}>
                <button 
                    className="mt-auto mb-3 w-56 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => showLoginForm()}
                    >Login</button>
                <button 
                    className="mb-3 w-56 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
                    onClick={() => showRegisterForm()}
                    >Register</button>
                <button 
                    className="mb-auto w-56 bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={() => guestButtonHandler()}
                    >Continue as guest</button>
            </motion.div>
            )
    }

    return (
        <div className="h-screen w-screen flex flex-nowrap">
            <motion.div 
                className="h-full basis-1/2 overflow-hidden"
                initial={{opacity: .5, flexBasis: 0}}
                animate={{opacity: 1, flexBasis: "50%"}}
                exit={{opacity: .5, flexBasis: 0, transition: transition(.6)}}
                transition={transition()}> 
                    <motion.img 
                        className="object-cover h-full w-full scale-150" 
                        src={volcano_light} 
                        alt="volcano"
                        initial={{}}
                        animate={{}}
                        exit={{}}
                        transition={transition()}
                        />
            </motion.div>
            <motion.div
                className="pt-10 h-full basis-1/2 flex flex-col items-center justify-center"
                exit={{flexBasis: "100%"}}
                transition={transition(.6)}>
                    <motion.h1 
                        className="font-eczar text-7xl mb-1"
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: transition(.7)}}
                        exit={{opacity: 0, transition: transition(0)}}
                        >Volcanoes</motion.h1>
                    <motion.p 
                    className="font-serif text-xl ml-20 mb-24"
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: transition(1)}}
                    exit={{opacity: 0, transition: transition(0)}}
                    >- Jacob Hollister</motion.p>
                        <div
                            className="transition-all duration-500 flex content-center justify-center w-full"
                            style={{height: contentSize}}
                            >
                            <AnimatePresence exitBeforeEnter>
                                {formContainer} 
                            </AnimatePresence>
                        </div>
                    
            </motion.div>
        </div>
)

}