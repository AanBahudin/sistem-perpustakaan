import { customFetch } from "@/utils/customFetch"

export const getPengembalianData = async(search? : string) => {
    const response = await customFetch.get(`/pengembalian/user?${search}`)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data pengembalian'}
    }
    return response.data
}

export const createPengembalianUser = async(idPeminjaman: string) => {
    const {data : response, status} = await customFetch.get(`/pengembalian/user/create/${idPeminjaman}`)
    if (status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data pengembalian'}
    }
    return response.data
}

export const getDetailPengembalianData = async(id: string) => {
    const response = await customFetch.get(`/pengembalian/user/${id}`)

    return response.data.data
}