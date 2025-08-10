import { customFetch } from "@/utils/customFetch";

export const getAllPengembalian = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/pustakawan/pengembalian?${query}`)
    return response.data
}