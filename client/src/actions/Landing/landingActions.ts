import { customFetch } from "@/utils/customFetch"

export const getLandingData = async() => {
    const {data: response} = await customFetch.get('/landing/data')
    return response.data
}

export const getKatalogData = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/landing/katalog?${query}`)
    return response.data
}

export const getSingleKatalogData = async({idBuku} : {idBuku: string}) => {
    const {data: response} = await customFetch.get(`/landing/katalog/${idBuku}`)
    return response.data
}