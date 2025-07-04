import { customFetch } from "@/utils/customFetch";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const getPerpanjangan = async(query: string) => {
    const response = await customFetch.get(`/perpanjangan/user?${query}`)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data perpanjangan saat ini.'}
    }
    return response.data
}

export const getPerpanjanganDetail = async(id: string) => {
    const response = await customFetch.get(`/perpanjangan/user/${id}`)
    return response.data.data || {}
}

export const getSinglePerpanjanganByPeminjamanId = async(id: string) => {
    const response = await customFetch.get(`/perpanjangan/user/peminjaman/${id}`)
    return response.data.data || {}
}

export const tambahPerpanjangan = async({
    idPeminjaman,
    idBuku,
    durasi,
    alasan
} : {idPeminjaman: string, idBuku: string, durasi: number, alasan: string}) => {
    const response = await customFetch.post('/perpanjangan/user', {
        idPeminjaman,
        idBuku,
        durasi,
        alasan
    })

    if (response.status >= 400) return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data perpanjangan saat ini.'}

    queryClient.invalidateQueries({queryKey: ['peminjaman', idPeminjaman]})
    queryClient.invalidateQueries({queryKey: ['perpanjangan', 'peminjamnan', idPeminjaman]})
    queryClient.invalidateQueries({ queryKey: ['stats', 'pengguna']})
}

export const pembatalanPerpanjangan = async({idPerpanjangan} : {idPerpanjangan: string}) => {
    const response = await customFetch.delete(`/perpanjangan/user/${idPerpanjangan}`)
    
    if (response.status >= 400) return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data perpanjangan saat ini.'}
    queryClient.invalidateQueries({queryKey: ['detail-peminjaman', 'perpanjangan', idPerpanjangan]})
}