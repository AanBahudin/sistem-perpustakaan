import { customFetch } from "@/utils/customFetch";

export const getProfilProdi = async() => {
    const {data: response} = await customFetch.get('prodi/profile')
    return response.data
}