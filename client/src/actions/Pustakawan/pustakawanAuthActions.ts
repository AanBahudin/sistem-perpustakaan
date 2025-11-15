import { customFetch } from "@/utils/customFetch";

export const loginPustakawan = async(data: FormData) => {
    const loginData = Object.fromEntries(data)
    const {data: response} = await customFetch.post('/auth/login/pustakawan', loginData)
    return response
}