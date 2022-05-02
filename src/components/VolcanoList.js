import { useMemo } from 'react'
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS

import { useFetchVolcanoes } from '../hooks/useAPI';

import transition from '../utils/transition';


export default function VolcanoList ({country, populatedWithin}) {
    const navigate = useNavigate(0)

    const columnDefs = useMemo(() => [
        { headerName: "name", field: "name"},
        { headerName: "region", field: "region"},
        { headerName: "subregion", field: "subregion"}
    ], [])
    
    const {loading, data: volcanoData, error} = useFetchVolcanoes(country, populatedWithin)

    return (
        <motion.div
            key={country + populatedWithin} 
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: transition(.2)}}
            exit={{opacity: 0, transition: transition(0)}}
            className='ag-theme-alpine w-full h-3/4 p-3'>
            { loading ? (
                loading
            ) : (
                <AgGridReact
                    onRowClicked={(e) => navigate(`/volcano/${e.data.id}`)}
                    columnDefs={columnDefs}
                    rowData={volcanoData}
                    pagination
                    paginationAutoPageSize={true}
                    gridOptions={{
                        onGridReady: (event) => event.api.sizeColumnsToFit()
                    }}
                />
            )}
        </motion.div>
    )

}