import { customFetch } from "@/utils/customFetch";

export const pustakawanTambahDurasi = async(data : any) => {
    const { data: response } = await customFetch.post('/durasi', data)
    return response.data
}

export const getAllDurasiPeminjaman = async() => {
    const {data: response} = await customFetch.get('/durasi')
    return response.data
}

export const pustakawanEditDurasi = async(data: any, idDurasi: string) => {
    const {data: response} = await customFetch.patch(`/durasi/${idDurasi}`, data)
    return response.data
}

export const pustakawanHapusDurasi = async(idDurasi: string) => {
    const {data: response} = await customFetch.delete(`/durasi/${idDurasi}`)
    return response.data
}