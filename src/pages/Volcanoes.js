import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

import volcano_light from "../assets/volcano_light_2.jpg"

import transition from "../utils/transition"

export default function Volcanoes () {
    const navigate = useNavigate()

    return (
        <div className="h-screen w-screen flex flex-nowrap">
            <motion.div
                className="pt-10 h-full basis-1/2"
                initial={{flexBasis: "100%"}}
                animate={{flexBasis: "70%"}}
                exit={{flexBasis: "100%"}}
                transition={transition()}>
                    <button onClick={() => navigate("/volcano/1")}>
                        click me
                    </button>
            </motion.div>
            <motion.div 
                className="h-full basis-1/2 overflow-hidden"
                // Framer animation props
                initial={{flexBasis: 0, opacity: .5}}
                animate={{flexBasis: "30%", opacity: 1}}
                exit={{opacity: .5, flexBasis: 0}}
                transition={transition()}> 
                    <motion.img 
                        style={{objectPosition: "55% 0"}}
                        className="object-cover h-full w-full scale-100" 
                        src={volcano_light} 
                        alt="volcano"
                        initial={{}}
                        animate={{}}
                        exit={{}}
                        transition={transition()}
                        />
            </motion.div>
        </div>
    )

}