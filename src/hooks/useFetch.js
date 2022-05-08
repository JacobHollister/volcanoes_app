import { useEffect, useRef, useState } from "react";

const BASE_URL = "http://sefdb02.qut.edu.au:3001"

export function useFetch(url, options = {}) {
    const fetchedDataUrl = useRef(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    

    useEffect(() => {
        if(fetchedDataUrl.current !== url){
            setLoading(true)
            fetch(BASE_URL + url, {...options})
                .then((res) =>{
                    return res.json()
                })
                .then((data) => {
                    setData(data);
                })
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setLoading(false);
                    fetchedDataUrl.current = url
                });
        }
    }, [url, options]);
    
    return {
        loading,
        data,
        error,
    };
}