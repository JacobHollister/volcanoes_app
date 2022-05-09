import { useEffect, useRef, useState } from "react";
import axios from "axios"

export function useFetch(url, config) {
    const fetchedDataUrl = useRef(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    

    useEffect(() => {
        if(fetchedDataUrl.current !== url){
            setLoading(true)
            axios({...config, timeout: 10000})
                .then((result) => {
                    console.log(result)
                    setData(result.data);
                })
                .catch((e) => {
                    console.log(e)
                    setError(e.message);
                })
                .finally(() => {
                    setLoading(false);
                    fetchedDataUrl.current = url
                });
        }
    }, [url, config]);
    
    return {
        loading,
        data,
        error,
    };
}