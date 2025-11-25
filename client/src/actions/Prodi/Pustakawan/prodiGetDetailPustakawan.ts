import { customFetch } from "@/utils/customFetch";

const prodiGetDetailPustakawanAction = async(id: string) => {
    const {data: response} = await customFetch.get(`/prodi/pustakawan/${id}`)
    return response.data
}

export default prodiGetDetailPustakawanAction