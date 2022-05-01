//import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import transition from "../utils/transition"

export default function RegisterForm ({close, isVisible}) {
    const navigate = useNavigate()


    const registerHandler = (e) => {
        e.preventDefault()
        close()
        navigate('/volcanoes')
    }

    const cancelHandler = (e) => {
        e.preventDefault()
        close()
    }

    const form = (
        <motion.form
        key="registerForm"            
        className="flex flex-col w-full px-20 max-w-lg"
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: transition()}}
        exit={{opacity: 0, transition: transition()}}>
            <div className="mb-6">
                <h3 className="font-serif text-3xl text-center mb-4">
                    Register
                </h3>
                <label 
                    className="block ml-1 mb-2 text-xl font-serif font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="email">
                        Email
                </label>
                <input 
                    required
                    type="email" 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />
            </div>
            <div className="mb-6">
                <label 
                    className="block ml-1 mb-2 text-xl font-serif text-gray-900 dark:text-gray-300"
                    htmlFor="password">
                        Password
                    </label>
                <input 
                    required
                    type="password" 
                    id="password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />
            </div>
            <div className="flex flex-row gap-10 px-1">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 font-medium text-white py-1 px-4 rounded h-8 flex-1"
                    onClick={(e) => registerHandler(e)}
                    >
                        Register
                </button>
                <button 
                    className="bg-slate-500 hover:bg-slate-400 font-medium text-white py-1 px-4 rounded h-8 flex-1"
                    onClick={(e) => cancelHandler(e)}
                    >
                        Cancel
                </button>
            </div>
        </motion.form>
    )

    return(
        <>
            {isVisible ? form : null}
        </>
    )
}