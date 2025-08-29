import { customFetch } from "@/utils/customFetch";

export const getProfilePustakawan = async() => {
    const {data: response} = await customFetch.get('/pustakawan/profile')
    return response.data
}

export const updatePasswordPustakawan = async(data: any) => {
    const {data: response} = await customFetch.post('/pustakawan/auth/password', data)
    return response.data
}