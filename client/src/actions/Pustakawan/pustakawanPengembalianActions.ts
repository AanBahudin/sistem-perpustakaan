import { setIsMissingSwitch } from "@/cart/pengembalianSlice";
import { store } from "@/store";
import { customFetch } from "@/utils/customFetch";

export const getAllPengembalian = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/pustakawan/pengembalian?${query}`)
    return response.data
}

export const getSinglePengembalianPustakawan = async(id: string) => {
    const {data: response} = await customFetch.get(`/pengembalian/${id}`)
    return response.data
}

export const createPengembalianDataPustakawan = async(formData: any) => {
    const {data: response} = await customFetch.post(`/pengembalian/create`, formData)
    store.dispatch(setIsMissingSwitch(false))
    return response.data
}