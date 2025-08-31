import { customFetch } from "@/utils/customFetch";

export const getAllDurasiPeminjaman = async() => {
    const {data: response} = await customFetch.get('/durasi')
    return response.data
}

export const pustakawanHapusDurasi = async(idDurasi: string) => {
    const {data: response} = await customFetch.delete(`/durasi/${idDurasi}`)
    return response.data
}