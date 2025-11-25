import { customFetch } from "@/utils/customFetch";

const prodiAktifkanPustakawanAction = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/pustakawan/aktifkan/${id}`)
    return response.data
}

export default prodiAktifkanPustakawanAction