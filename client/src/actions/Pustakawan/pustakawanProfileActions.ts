import { customFetch } from "@/utils/customFetch";

export const getProfilePustakawan = async() => {
    const {data: response} = await customFetch.get('/pustakawan/profile')
    return response.data
}