import { QueryClient } from "@tanstack/react-query"
import { customFetch } from "@/utils/customFetch"
// import { toast } from "sonner"

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const getPeminjamanData = async(search? : string) => {
    const response = await customFetch.get(`/pinjaman/user?${search}`)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Data tidak ditemukan'}
    }
    return response.data
}

export const getDetailPeminjaman = async(id: string) => {
    const response = await customFetch.get(`/pinjaman/user/${id}`)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Data tidak ditemukan'}
    }

    return response.data.data
}

export const getPeminjamanByBookId = async(bookId: string) => {
    const response = await customFetch.get(`/pinjaman/user/book/${bookId}`)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Data tidak ditemukan'}
    }
    return response.data.data
}

export const getPeminjamanByPengembalianId = async(idPengembalian: string) => {
    console.log(idPengembalian)
    const response = await customFetch.get(`/pinjaman/user/pengembalian/${idPengembalian}`)
    return response.data.data
}

export const tambahPeminjaman = async(formData: FormData) => {
    const data = Object.fromEntries(formData)
    const idBuku = formData.get('idBuku')

    const response = await customFetch.post('/pinjaman/request/pinjaman', data)
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengajukan peminjaman, coba lagi nanti'}
    }

    await queryClient.invalidateQueries({ queryKey: ['detail-peminjaman', idBuku] })
    
    return {
        message: 'Peminjaman Diajukkan',
        deskripsi: 'Silahkan cek menu Peminjaman untuk melihat',
        queryKey: ['detail-peminjaman', idBuku],
        redirectTo: '.',
        showToast: true
    }
}

export const pembatalanPeminjamanBuku = async(data : { idPeminjaman: string, idBuku: string}) => {
    const response = await customFetch.post('/pinjaman/user', {idPeminjaman: data.idPeminjaman})
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat membatalkan pengajuan buku'}
    }

    await queryClient.invalidateQueries({ queryKey: ['detail-peminjaman', data.idBuku] })
    // toast
}