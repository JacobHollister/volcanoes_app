import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import volcano_light from "../assets/volcano_light.jpg"

export default function Home () {
    const navigate = useNavigate()

    const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

    return (
        <div className="home-container">
            <motion.div 
                initial={{}}
                animate={{}}
                exit={{opacity: .5}}
                transition={transition} 
                className="home-picture">
                <img src={volcano_light} alt="volcano" />
            </motion.div>
            <motion.div
                className="home-info"
                exit={{width: "100vw"}}
                transition={transition}>
                <button onClick={() => navigate("/volcanoes")}>
                    click me
                </button>
            </motion.div>
        </div>
    )

}