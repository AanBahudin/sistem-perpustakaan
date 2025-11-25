import { customFetch } from "@/utils/customFetch";

const prodiGetAllBukuDihilangkan = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/dihilangkan?${query}`)
    return response.data
}

export default prodiGetAllBukuDihilangkan