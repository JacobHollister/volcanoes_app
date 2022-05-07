import { useEffect, useRef, useState } from "react";

const BASE_URL = "http://sefdb02.qut.edu.au:3001"

export function useFetch(url, options = {}) {
    const hasFetchedData = useRef(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!hasFetchedData.current){
            fetch(BASE_URL + url, options)
                .then((res) =>
                    res.json()
                )
                .then((data) => {
                    setData(data);
                })
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setLoading(false);
                    hasFetchedData.current = true;
                });
        }
    }, [url, options]);
    
    return {
        loading,
        data,
        error,
    };
}