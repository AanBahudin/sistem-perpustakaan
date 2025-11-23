import { customFetch } from "@/utils/customFetch"

const penggunaToggleSimpanAction = async(id: string) => {    
    const response = await customFetch.post('/simpan', {bookId: id})
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
    }

    // await queryClient.invalidateQueries({ queryKey: ['simpan']})
    // await queryClient.invalidateQueries({ queryKey: ['detail-book', id]})
}

export default penggunaToggleSimpanAction