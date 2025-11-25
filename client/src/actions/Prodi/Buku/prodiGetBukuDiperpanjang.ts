import { customFetch } from "@/utils/customFetch";

const prodiGetAllBukuDiperpanjang = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/diperpanjang?${query}`)
    return response.data
}

export default prodiGetAllBukuDiperpanjang