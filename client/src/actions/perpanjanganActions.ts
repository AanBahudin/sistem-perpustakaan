import { customFetch } from "@/utils/customFetch";

export const getPerpanjangan = async(query: string) => {
    const response = await customFetch.get(`/perpanjangan/user?${query}`)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data perpanjangan saat ini.'}
    }
    return response.data
}

export const getPerpanjanganDetail = async(id: string) => {
    const response = await customFetch.get(`/perpanjangan/user/${id}`)
    return response.data.data
}