import { customFetch } from "@/utils/customFetch";

export const loginPustakawan = async(data: any) => {
    const {data: response} = await customFetch.post('/auth/login/pustakawan', data)
    return response
}