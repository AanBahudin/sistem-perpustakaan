import { customFetch } from "@/utils/customFetch";

const prodiGetSingleBuku = async(id: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/detail/${id}`)
    return response.data
}

export default prodiGetSingleBuku 