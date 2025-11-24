import { customFetch } from "@/utils/customFetch"

const pustakawanDeleteKategoriAction = async(idKategori: string) => {
    const {data: response} = await customFetch.delete(`/kategori/${idKategori}`)
    return response.data
}

export default pustakawanDeleteKategoriAction