import { customFetch } from "@/utils/customFetch";

export const prodiGetAllBuku = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi?${query}`)
    return response.data
}