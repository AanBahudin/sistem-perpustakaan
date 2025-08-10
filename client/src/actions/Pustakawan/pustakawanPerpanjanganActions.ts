import { customFetch } from "@/utils/customFetch";

export const getAllPerpanjangan = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/pustakawan/perpanjangan?${query}`)
    return response.data
}