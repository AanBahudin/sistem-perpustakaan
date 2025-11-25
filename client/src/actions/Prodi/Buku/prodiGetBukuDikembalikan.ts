import { customFetch } from "@/utils/customFetch";

const prodiGetAllBukuDikembalikan = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/dikembalikan?${query}`)
    return response.data
}

export default prodiGetAllBukuDikembalikan