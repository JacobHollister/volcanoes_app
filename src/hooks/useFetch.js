import { useEffect, useState } from "react";

const BASE_URL = "http://sefdb02.qut.edu.au:3001"

export function useFetch(url, options = {}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        console.log("fetching from API", BASE_URL, url)
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
            });
    }, [url]);
    
    return {
        loading,
        data,
        error,
    };
}