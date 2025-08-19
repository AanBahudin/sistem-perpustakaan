import { customFetch } from "@/utils/customFetch";

export const getAllPengembalian = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/pustakawan/pengembalian?${query}`)
    return response.data
}

export const getSinglePengembalianPustakawan = async(id: string) => {
    const {data: response} = await customFetch.get(`/pengembalian/${id}`)
    return response.data
}

export const createPengembalianDataPustakawan = async(idPeminjaman: string) => {
    return ''
}