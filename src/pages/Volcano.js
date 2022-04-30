import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import transition from "../utils/transition"

export default function Volcano () {
    const navigate = useNavigate()

    return (
        <motion.div 
            class="bg-volcano_light_3 bg-cover w-screen h-screen flex justify-center"
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: transition()}}
            exit={{opacity: 0, transition: transition(.5)}}
            >
            <motion.div
                style={{height: "700px", width: "800px"}}
                class="bg-white"
                initial={{height: "0px"}}
                animate={{height: "700px", transition: transition(.5)}}
                exit={{height: 0, transition: transition()}}
                >
                    <motion.button 
                        onClick={() => navigate("/volcanoes")}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: transition(1)}}
                        exit={{opacity: 0, transition: transition()}}
                        >
                        click me
                    </motion.button>
            </motion.div>
        </motion.div>
    )

}