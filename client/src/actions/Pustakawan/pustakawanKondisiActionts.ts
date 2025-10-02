import { customFetch } from "@/utils/customFetch";

export const getAllKondisi = async() => {
    const {data: response} = await customFetch.get('/kondisi')
    return response.data
}

export const pustakawanTambahKondisi = async(data: any) => {
    const {data: response} = await customFetch.post('/kondisi', data)
    return response.data
}

export const psutakawanEditKondisi = async(data: any, idKondisi: string) => {
    const { data: response } = await customFetch.patch(`/kondisi/${idKondisi}`, data)
    return response.data
}

export const pustakawanHapusKondisi = async(idKondisi: string) => {
    const {data: response} = await customFetch.delete(`/kondisi/${idKondisi}`)
    return response.data
} 