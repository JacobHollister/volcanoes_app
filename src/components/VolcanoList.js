import { useMemo, useState } from 'react'
import { motion } from 'framer-motion';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS

import { useAPI } from '../hooks/useAPI';

import transition from '../utils/transition';


export default function VolcanoList ({country}) {
    const columnDefs = useMemo(() => [
        { headerName: "name", field: "name"},
        { headerName: "region", field: "region"},
        { headerName: "subregion", field: "subregion"}
    ], [])
    
    const {loading, data: volcanoData, error} = useAPI(`/volcanoes?country=${country}`)


    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: transition(0)}}
            exit={{opacity: 0, transition: transition(0)}}
            className='ag-theme-alpine w-full h-3/4 p-5'>
            { loading ? (
                loading
            ) : (
                <AgGridReact
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