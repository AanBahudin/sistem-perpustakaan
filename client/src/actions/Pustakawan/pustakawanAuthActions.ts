import { customFetch } from "@/utils/customFetch";

export const loginPustakawan = async({email, password} : {email: string, password: string}) => {
    const {data} = await customFetch.post('/auth/login/pustakawan', {email, password})
    return data
}