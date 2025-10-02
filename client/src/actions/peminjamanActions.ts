
import { QueryClient } from "@tanstack/react-query"
import { customFetch } from "@/utils/customFetch"
import { toast } from "sonner"
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
    await queryClient.invalidateQueries({ queryKey: ['stats', 'pengguna'] })
    
    return {
        message: 'Peminjaman Diajukkan',
        deskripsi: 'Silahkan cek menu Peminjaman untuk melihat',
        queryKey: ['detail-peminjaman', idBuku],
        redirectTo: '.',
        showToast: true
    }
}


export const tambahPinjamanNew = async({idBuku, alasan, durasi} : {idBuku: string, alasan: string, durasi: number}) => {
    const response = await customFetch.post('/pinjaman/request/pinjaman', {
        idBuku,
        alasan,
        durasiPeminjaman: durasi
    })

    if (response.status >= 400) {
        toast('Tidak dapat mengajukan peminjaman', {description: 'Terjadi kesalahan, silahkan coba lagi'})
    }
    
    await queryClient.invalidateQueries({queryKey: ['confirm', 'peminjaman', idBuku]})
    await queryClient.invalidateQueries({ queryKey: ['stats', 'pengguna']})
    await queryClient.invalidateQueries({queryKey: ['confirm', 'pinjaman', idBuku]})

    toast('Berhasil Di Ajukan!', {description: 'Silahkan cek peminjaman anda pada menu Peminjaman'})
}

export const pembatalanPeminjamanBuku = async(data : { idPeminjaman: string, idBuku: string}) => {
    const response = await customFetch.post('/pinjaman/user', {idPeminjaman: data.idPeminjaman})
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat membatalkan pengajuan buku'}
    }

    await queryClient.invalidateQueries({ queryKey: ['detail-peminjaman', data.idBuku] })
    // toast
}