import { customFetch } from "@/utils/customFetch";

export const getAllPenulis = async() => {
    const {data: response} = await customFetch.get('/penulis')
    return response.data
}