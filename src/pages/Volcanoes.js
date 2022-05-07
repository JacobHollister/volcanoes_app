import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Select from 'react-select';

import transition from "../utils/transition"

import { useFetchCountries } from "../hooks/useAPI";

import volcano_light from "../assets/volcano_light_2.jpg"
import VolcanoList from "../components/VolcanoList";
import Loading from "../components/Loading";

export default function Volcanoes () {
    const {loading, data: countries, error } = useFetchCountries('/countries')

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedDistance, setSelectedDistance] = useState(null)
    const [tableData, setTableData] = useState({country: "", populatedWithin: ""})
    const [showTable, setShowTable] = useState(false)

    const countryChangeHandler = (e) => {
        setSelectedCountry(e.value)
    }

    const distanceChangeHandler = (e) => {
        setSelectedDistance(e.value)
    }

    const searchHandler = () => {
        setTableData({country: selectedCountry, populatedWithin: selectedDistance})
        setShowTable(true)
    }

    const selectStyles = {
        menu: (provided) => ({
            ...provided,
            border: "1px solid rgb(156, 163, 175)"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "black"
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: "black"
        }),
        control: (provided) => ({
            ...provided,
            border: "1px solid rgb(156, 163, 175)",
            background: "rgb(249, 250, 251)",
        }),
    }

    const distanceOptions = ["none", "5km", "10km", "30km", "100km"].map(country => {
                                            return { label: country, value: country}}
                                        )

    return (
        <div className="h-screen w-screen flex flex-nowrap">
            <motion.div
                key="infoDiv"
                className="pt-16 h-full basis-1/2"
                initial={{flexBasis: "100%"}}
                animate={{flexBasis: "70%", transition: transition(0)}}
                exit={{flexBasis: "100%", transition: transition(.6)}}
                >
                    <motion.div
                        key="info"
                        className="flex flex-col h-3/4 w-full"
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: transition(.6)}}
                        exit={{opacity: 0, transition: transition(0)}}
                        >
                            <AnimatePresence>
                                <h1 className="text-center font-eczar text-5xl my-8">Volcano List</h1>
                                {!error && !loading ? (
                                    <Select
                                        isLoading={loading}
                                        placeholder="-- Select Country --"
                                        key="select"
                                        className="mx-auto mb-4 w-72 shadow-lg"
                                        onChange={(e) => countryChangeHandler(e)}
                                        options={countries.map(country => {
                                                return { label: country, value: country}}
                                            )}
                                        styles={selectStyles}
                                        /> 
                                ) : (
                                    <h1>
                                        {error}
                                    </h1>
                                )}
                                { selectedCountry &&
                                    <motion.div
                                    key="distanceSelect"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1, transition: transition(0)}}
                                    exit={{opacity: 0, transition: transition(0)}}
                                    className="h-14"
                                    >
                                        <Select
                                        className="mx-auto mb-4 w-72 shadow-lg"                                        
                                        onChange={(e) => distanceChangeHandler(e)}
                                        name={"distanceToPopulation"}
                                        id={"distanceToPopulation"}
                                        placeholder={"-- Select Popultated Within --"}
                                        styles={selectStyles}
                                        options={distanceOptions}
                                        isSearchable={false}
                                        />
                                    </motion.div>
                                }
                                { selectedDistance &&
                                    <motion.div
                                    key="searchButton"
                                    className="h-14 flex justify-center"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1, transition: transition(0)}}
                                    exit={{opacity: 0, transition: transition(0)}}
                                    >
                                        <button
                                        className="shadow-xl w-72 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => searchHandler()}
                                        >Search</button>
                                    </motion.div>
                                }
                                { showTable &&
                                    <div key="results" className="h-full">
                                        <div className="pt-6 pl-6"
                                        >
                                            <motion.h2 
                                                key="resultLabel"
                                                className="font-eczar text-xl"
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1, transition: transition(0)}}
                                                exit={{opacity: 0, transition: transition(0)}}
                                                >
                                                    Showing results for 
                                                </motion.h2>
                                            <motion.h2 
                                                key="searchInfo"
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
                                    </div>
                                }
                                {
                                    loading && <Loading/>
                                }
                            </AnimatePresence>
                    </motion.div>
            </motion.div>
            <motion.div 
                className="h-full basis-1/2 overflow-hidden"
                key="volcano"
                initial={{flexBasis: 0, opacity: .5}}
                animate={{flexBasis: "30%", opacity: 1, transition: transition(0)}}
                exit={{opacity: .5, flexBasis: 0,  transition: transition(.6)}}
                > 
                    <motion.img 
                        key="image"
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