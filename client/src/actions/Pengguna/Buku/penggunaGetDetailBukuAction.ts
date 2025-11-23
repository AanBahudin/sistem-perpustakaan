import { customFetch } from "@/utils/customFetch"

const getDetailBuku = async(id: string) => {
    const {data: response, status} = await customFetch.get(`/buku/user/${id}`)
    if (status >= 400) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Tidak dapat mengambil data buku'}
    }
    return response.data
}

export default getDetailBuku