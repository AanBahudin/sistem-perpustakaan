import { customFetch } from "@/utils/customFetch";

export const prodiLogin = async(data: any) => {
    const {data: response} = await customFetch.post('/auth/login/prodi', data)
    return response.data
}