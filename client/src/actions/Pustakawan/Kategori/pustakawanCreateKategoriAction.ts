import { customFetch } from "@/utils/customFetch";

const pustakawanCreateKategoriAction = async(data: any) => {
    const response = await customFetch.post('/kategori', data)
    return response.data.data
}

export default pustakawanCreateKategoriAction