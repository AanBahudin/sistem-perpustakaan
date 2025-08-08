import { customFetch } from "@/utils/customFetch";

export const getAllPengajuan = async() => {
    const {data: response} = await customFetch.get('/pustakawan/pengajuan')
    return response.data
}