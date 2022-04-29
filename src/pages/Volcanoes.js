import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

import volcano_light from "../assets/volcano_light.jpg"

export default function Volcanoes () {

    const navigate = useNavigate()

    const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.6};

    return (
        <div className="home-container">
            <motion.div 
                className="home-info"
                initial={{width: "100vw"}}
                animate={{width: "50vw"}}
                transition={transition} >
                <button onClick={() => navigate("/volcano/1")}>
                    click me
                </button>
            </motion.div>
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={transition} 
                className="home-picture">
                <img src={volcano_light} alt="volcano" />
            </motion.div>
        </div>
    )

}