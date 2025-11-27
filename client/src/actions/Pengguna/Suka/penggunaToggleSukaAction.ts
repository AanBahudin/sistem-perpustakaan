import { customFetch } from "@/utils/customFetch"

const addOrRemoveSukaNew = async(id: string) => {
    const response = await customFetch.post('/suka', {bukuId: id})
    if (response.status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data, silahkan periksa koneksi internet Anda'}
    }
}

export default addOrRemoveSukaNew