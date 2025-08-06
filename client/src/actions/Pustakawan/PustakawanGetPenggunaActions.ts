import { customFetch } from "@/utils/customFetch";

export const getAllPengguna = async(params: string) => {
    const {data: response} = await customFetch.get(`/pustakawan/users?${params}`)
    return response.data
}

export const getAllPenggunaDosen = async(params: string) => {
    const {data: response} = await customFetch.get(`/pustakawan/dosen?${params}`)
    return response.data
}

export const getAllPenggunaMahasiswa = async(params: string) => {
    const {data: response} = await customFetch.get(`/pustakawan/mahasiswa?${params}`)
    return response.data
}

export const getSinglePengguna = async(id: string) => {
    const {data: response} = await customFetch.get(`/pustakawan/users/${id}`)
    return response.data
}