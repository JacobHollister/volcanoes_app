import { useNavigate } from "react-router-dom"
import { motion} from "framer-motion"

import transition from "../utils/transition"

import volcano_light from "../assets/volcano_light_1.jpg"

export default function Home () {
    const navigate = useNavigate()

    return (
        <div class="h-screen w-screen flex flex-nowrap">
            <motion.div 
                class="h-full basis-1/2 overflow-hidden"
                // Framer animation props
                initial={{opacity: .5, flexBasis: 0}}
                animate={{opacity: 1, flexBasis: "50%"}}
                exit={{opacity: .5, flexBasis: 0}}
                transition={transition()}> 
                    <motion.img 
                        class="object-cover h-full w-full scale-150" 
                        src={volcano_light} 
                        alt="volcano"
                        initial={{}}
                        animate={{}}
                        exit={{}}
                        transition={transition()}
                        />
            </motion.div>
            <motion.div
                class="h-full basis-1/2"
                exit={{flexBasis: "100%"}}
                transition={transition()}>
                    <button onClick={() => navigate("/volcanoes")}>
                        click me
                    </button>
            </motion.div>
        </div>
)

}