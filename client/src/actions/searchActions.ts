import { customFetch } from "@/utils/customFetch"



export const searchBookPageDataLoader = async(params: string) => {
    const response = await customFetch.get(`/search?${params}`)
    return response.data.data
}