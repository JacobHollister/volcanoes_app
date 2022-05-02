import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion";

import transition from "../utils/transition"

import { useAPI } from "../hooks/useAPI";

import volcano_light from "../assets/volcano_light_2.jpg"
import VolcanoList from "../components/VolcanoList";

export default function Volcanoes () {
    const navigate = useNavigate()

    const {loading, data: countries, error} = useAPI('/countries')

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedDistance, setSelectedDistance] = useState(null)
    const [tableData, setTableData] = useState({country: "", populatedWithin: ""})
    const [showTable, setShowTable] = useState(false)

    const countryChangeHandler = (e) => {
        setSelectedCountry(e.target.value)
    }

    const distanceChangeHandler = (e) => {
        setSelectedDistance(e.target.value)
    }

    const searchHandler = () => {
        setTableData({country: selectedCountry, populatedWithin: selectedDistance})
        setShowTable(true)
    }

    let selectOptions
    
    if ((!loading || !error) && countries.length > 0) {
        selectOptions = countries.map((country) => {
            return (
                <option value={country} key={country}>{country}</option>
            )
        })
    }

    return (
        <div className="h-screen w-screen flex flex-nowrap">
            <motion.div
                className="pt-16 h-full basis-1/2"
                initial={{flexBasis: "100%"}}
                animate={{flexBasis: "70%", transition: transition(0)}}
                exit={{flexBasis: "100%", transition: transition(.6)}}
                >
                    <motion.div
                        className="flex flex-col h-3/4 w-full"
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: transition(.6)}}
                        exit={{opacity: 0, transition: transition(0)}}
                        >
                            <AnimatePresence exitBeforeEnter>
                                <h1 className="text-center font-eczar text-5xl my-8">Volcano List</h1>
                                {selectOptions ? (
                                    <select 
                                    onChange={(e) => {countryChangeHandler(e)}}
                                    name={'country'} 
                                    id={"country"} 
                                    defaultValue={"default"}
                                    className="mx-auto mb-4 bg-gray-50 border border-gray-400 text-gray-900 text-md rounded focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option disabled value="default"> -- Country -- </option>
                                        {selectOptions}
                                    </select>
                                ) : (
                                    null
                                )} 
                                { selectedCountry ? (
                                    <motion.div
                                    key="distanceSelect"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1, transition: transition(0)}}
                                    exit={{opacity: 0, transition: transition(0)}}
                                    className="h-14"
                                    >
                                        <select
                                        className="mx-auto mb-4 bg-gray-50 border border-gray-400 text-gray-900 text-md rounded focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => distanceChangeHandler(e)}
                                        name={"distanceToPopulation"}
                                        id={"distanceToPopulation"}
                                        defaultValue={"default"}
                                        >
                                            <option disabled value="default"> -- Closest Population Distance -- </option>
                                            <option value={"none"}>none</option>
                                            <option value={"5km"}>5km</option>
                                            <option value={"10km"}>10km</option>
                                            <option value={"30km"}>30km</option>
                                            <option value={"100km"}>100km</option>
                                        </select>
                                    </motion.div>
                                ) : (
                                    null
                                )}
                                { selectedDistance ? (
                                    <motion.div
                                    key="searchButton"
                                    className="h-14 flex justify-center"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1, transition: transition(0)}}
                                    exit={{opacity: 0, transition: transition(0)}}
                                    >
                                        <button
                                        className="w-72 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => searchHandler()}
                                        >Search</button>
                                    </motion.div>
                                ) : (
                                    null
                                )}
                                { showTable ? (
                                    <>
                                        <div className="pt-6 pl-8"
                                        >
                                            <motion.h2 
                                                className="font-eczar text-xl"
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1, transition: transition(0)}}
                                                exit={{opacity: 0, transition: transition(0)}}
                                                >
                                                    Showing results for 
                                                </motion.h2>
                                            <motion.h2 
                                                key={tableData.country + tableData.populatedWithin}
                                                className="font-eczar text-xl"
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1, transition: transition(0)}}
                                                exit={{opacity: 0, transition: transition(0)}}
                                                >
                                                    <span><i>Volcanoes in <strong>{tableData.country} </strong></i></span>
                                                    <span><i>{(tableData.populatedWithin !== "none") ? "with people living within " : null}</i></span>
                                                    <span><i>{(tableData.populatedWithin !== "none") ? <strong>{tableData.populatedWithin}</strong> : null}</i></span>
                                                </motion.h2>
                                        </div>
                                        <VolcanoList country={tableData.country} populatedWithin={tableData.populatedWithin}/>
                                    </>
                                ) : (
                                    null
                                )}
                            </AnimatePresence>
                    </motion.div>
            </motion.div>
            <motion.div 
                className="h-full basis-1/2 overflow-hidden"
                // Framer animation props
                initial={{flexBasis: 0, opacity: .5}}
                animate={{flexBasis: "30%", opacity: 1, transition: transition(0)}}
                exit={{opacity: .5, flexBasis: 0,  transition: transition(.6)}}
                > 
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