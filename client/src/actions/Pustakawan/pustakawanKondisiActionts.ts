import { customFetch } from "@/utils/customFetch";

export const getAllKondisi = async() => {
    const {data: response} = await customFetch.get('/kondisi')
    return response.data
}