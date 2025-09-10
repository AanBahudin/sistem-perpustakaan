import { customFetch } from "@/utils/customFetch";

export const prodiGetAllBuku = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi?${query}`)
    return response.data
}

export const prodiGetAllBukuDipinjam = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/dipinjam?${query}`)
    return response.data
}

export const prodiGetAllBukuDiperpanjang = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/diperpanjang?${query}`)
    return response.data
}

export const prodiGetAllBukuDikembalikan = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/dikembalikan?${query}`)
    return response.data
}

export const prodiGetAllBukuDihilangkan = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/dihilangkan?${query}`)
    return response.data
}

export const prodiGetSingleBuku = async(id: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi/detail/${id}`)
    return response.data
}