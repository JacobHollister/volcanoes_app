import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Map, Marker } from "pigeon-maps"
import { Bar } from 'react-chartjs-2';

import { useFetchVolcano } from '../hooks/useAPI';
import { useAuth } from "../contexts/AuthContext";

import transition from "../utils/transition"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function Volcano () {
    const navigate = useNavigate()
    const volcanoID = useParams().id
    const { loggedIn, token} = useAuth()

    const {loading, data: volcanoData, error} = useFetchVolcano(volcanoID, token)

    console.log(volcanoData)

    return (
        <motion.div 
            className="bg-volcano_light_3 bg-cover w-screen h-screen flex justify-center"
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: transition()}}
            exit={{opacity: 0, transition: transition(1)}}
            >
            <motion.div
                style={{height: "800px"}}
                className="bg-white pt-10 w-3/4"
                initial={{height: "0px"}}
                animate={{height: "800px", transition: transition(.5)}}
                exit={{height: "0px", transition: transition(.6)}}
                >
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: transition(1)}}
                        exit={{opacity: 0, transition: transition()}}
                        >
                        { loading ? (
                            <h1>loading...</h1>
                        ) : (
                            <>
                                <h1
                                className="text-center font-eczar text-4xl mb-1 mt-5"
                                >
                                    {volcanoData.name}
                                </h1>
                                <div
                                className="flex flex-wrap flex-row h-full p-4"
                                >
                                    {/* Info */}
                                    <div
                                    className="basis-1/3"
                                    >
                                        <h4 className="font-eczar text-xl mb-2"><strong>Volcano Info</strong></h4>
                                        <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Country</h5>
                                        <p className="font-eczar text-lg pl-2 leading-tight mb-1">{volcanoData.country}</p>
                                        <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Country</h5>
                                        <p className="font-eczar text-lg pl-2 leading-tight mb-1">{volcanoData.region}</p>
                                        <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Subregion</h5>
                                        <p className="font-eczar text-lg pl-2 leading-tight mb-1">{volcanoData.subregion}</p>
                                        <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Elevation</h5>
                                        <p className="font-eczar text-lg pl-2 leading-tight mb-1">{volcanoData.elevation}</p>
                                        <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Summit</h5>
                                        <p className="font-eczar text-lg pl-2 leading-tight mb-1">{volcanoData.summit}</p>
                                        <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Last Eruption</h5>
                                        <p className="font-eczar text-lg pl-2 leading-tight">{volcanoData.last_eruption}</p>
                                    </div>
                                    {/* Map */}
                                    <div
                                    className="basis-2/3 rounded-lg overflow-hidden border-2 border-slate-400"
                                    >
                                        <Map defaultCenter={[parseFloat(volcanoData.latitude), parseFloat(volcanoData.longitude)]} defaultZoom={11}>
                                            <Marker width={50} anchor={[parseFloat(volcanoData.latitude), parseFloat(volcanoData.longitude)]} />
                                        </Map>
                                    </div>
                                    <div className="relative flex w-full">
                                        { !loggedIn ? (
                                            <>
                                                <div className="absolute top-0 bottom-0 left-0 right-0 bg-white opacity-60">
                                                </div>
                                            </>
                                        ) : (
                                            null
                                        )}
                                        {/* populationWithin */}
                                        <div
                                        className="basis-1/3 pt-20 h-80 my-auto"
                                        >
                                            <h4 className="font-eczar text-xl mb-2"><strong>Nearby Population</strong></h4>
                                            <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Within 5km</h5>
                                            <p className="font-eczar text-lg pl-2 leading-tight mb-1">{volcanoData.population_5km ? volcanoData.population_5km : "----"}</p>
                                            <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Within 10km</h5>
                                            <p className="font-eczar text-lg pl-2 leading-tight mb-1">{volcanoData.population_10km ? volcanoData.population_10km : "----"}</p>
                                            <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Within 30km</h5>
                                            <p className="font-eczar text-lg pl-2 leading-tight mb-1">{volcanoData.population_30km ? volcanoData.population_30km : "----"}</p>
                                            <h5 className="font-eczar text-lg font-semibold pl-1 leading-tight">Within 100km</h5>
                                            <p className="font-eczar text-lg pl-2 leading-tight mb-1">{volcanoData.population_100km ? volcanoData.population_100km : "----"}</p>
                                        </div>
                                        {/* Chart */}
                                        <div
                                        className="basis-2/3 pt-5 px-5 mt-5"
                                        >
                                            <div className="h-full">
                                                <Bar
                                                    options={{maintainAspectRatio: false}}
                                                    data={{
                                                        labels: ["5km", "10km", "30km", "100km"],
                                                        datasets: [{
                                                            label: "Populate living near volcano",
                                                            data: [
                                                                volcanoData.population_5km,
                                                                volcanoData.population_10km,
                                                                volcanoData.population_30km,
                                                                volcanoData.population_100km
                                                            ],
                                                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                                        }]
                                                    }}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
            </motion.div>
        </motion.div>
    )
}