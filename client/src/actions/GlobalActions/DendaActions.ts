import { customFetch } from "@/utils/customFetch";

export const getDenda = async() => {
    const {data: response} = await customFetch.get('/denda')
    return response.data
}