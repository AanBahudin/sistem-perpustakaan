import { customFetch } from "@/utils/customFetch";

const prodiGetAllBukuDipinjam = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/dipinjam?${query}`)
    return response.data
}

export default prodiGetAllBukuDipinjam