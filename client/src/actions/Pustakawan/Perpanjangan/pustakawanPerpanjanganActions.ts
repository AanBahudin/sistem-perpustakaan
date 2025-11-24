import { customFetch } from "@/utils/customFetch";


export const getAllPerpanjangan = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/pustakawan/perpanjangan?${query}`)
    return response.data
}

export const getSinglePerpanjanganPustakawan = async(id: string) => {
    const {data: response} = await customFetch.get(`/pustakawan/perpanjangan/${id}`)
    return response.data
}

export const terimaPengajuanPerpanjanganPustakawan = async({idPerpanjangan} : {idPerpanjangan: string}) => {
    const response = await customFetch.get(`/perpanjangan/accept/${idPerpanjangan}`)
    return response
}

export const tolakPerpanjanganPustakawan = async(id: string) => {
    const response = await customFetch.get(`/perpanjangan/decline/${id}`)
    return response
}
