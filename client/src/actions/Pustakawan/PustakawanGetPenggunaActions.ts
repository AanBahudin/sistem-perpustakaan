import { customFetch } from "@/utils/customFetch";

export const getAllPengguna = async(params: string) => {
    const {data: response} = await customFetch.get(`/pustakawan/users?${params}`)
    return response.data
}