import { customFetch } from "@/utils/customFetch"

const pustakawanEditKategoriAction = async(idKategori: string, data: any) => {
    const { data:response } = await customFetch.patch(`/kategori/${idKategori}`, data)
    return response.data
}

export default pustakawanEditKategoriAction