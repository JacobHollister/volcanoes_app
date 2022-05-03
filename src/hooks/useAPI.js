import { useFetch } from "./useFetch"

export const useFetchVolcano = ( volcanoID, token ) => {
    const url = `/volcano/${volcanoID}`
    const headers = token ? { headers: {Authorization: `Bearer ${token}`}} : null

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