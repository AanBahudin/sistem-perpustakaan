import { customFetch } from "@/utils/customFetch"
import { redirect } from "react-router-dom"

const discoverBuku = async(query: undefined | string) => {
    if (query === undefined) {
        redirect('/my/buku')
    }
    const data = await customFetch(`/buku/discovery?query=${query}`)
    if (data.status >= 400) {
        return {message: 'Terjadi kesalahan',  deskripsi: 'Tidak dapat mengambil buku'}
    }

    return data.data
}

export default discoverBuku