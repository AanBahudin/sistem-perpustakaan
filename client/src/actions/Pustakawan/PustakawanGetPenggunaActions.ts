import { customFetch } from "@/utils/customFetch";

export const getAllPengguna = async() => {
    const {data: response} = await customFetch.get('/pustakawan/users')
    return response.data
}