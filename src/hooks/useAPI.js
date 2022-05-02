import { useFetch } from "./useFetch"

const token = localStorage.getItem("Token")

// export const useLogin = ( credentials ) => {
//     const options = {
//         method: "POST",
//         headers: { accept: "application/json", "Content-Type": "application/json"},
//         body: JSON.stringify(credentials)
//     }
//     const url = "/user/login"

//     return useFetch(url, options)
// }

// export const useRegister = ( credentials ) => {
//     const options = {
//         method: "POST",
//         headers: { accept: "application/json", "Content-Type": "application/json"},
//         body: JSON.stringify(credentials)
//     }
//     const url = "/user/register"

//     return useFetch(url, options)
// }

export const useFetchVolcano = ( volcanoID ) => {
    const url = `/volcano/${volcanoID}`
    const headers = { Authorization: `Bearer ${token}`}

    return useFetch(url, headers)
}

export const useFetchVolcanoes = (country, populatedWithin) => {
    const querieString = `?country=${country}&${(populatedWithin !== "none") ? `populatedWithin=${populatedWithin}` : ""}`
    const url = "/volcanoes" + querieString

    return useFetch(url)
}

export const useFetchCountries = () => {
    const url = '/countries'

    return useFetch(url)
}