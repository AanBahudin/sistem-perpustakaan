import { customFetch } from "@/utils/customFetch";

export const getAllDurasiPeminjaman = async() => {
    const {data: response} = await customFetch.get('/durasi')
    return response.data
}