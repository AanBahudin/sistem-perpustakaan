import { customFetch } from "@/utils/customFetch";

export const getDurasi = async() => {
    const response = await customFetch.get('/durasi')
    return response.data.data
}