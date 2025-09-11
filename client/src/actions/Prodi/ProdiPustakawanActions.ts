import { customFetch } from "@/utils/customFetch";

export const prodiGetAllPustakawanData = async(query: string) => {
    const { data: response } = await customFetch.get(`/prodi/pustakawan?${query}`)
    return response.data
}

export const prodiGetSinglePustakawanData = async(id: string) => {
    const {data: response} = await customFetch.get(`/prodi/pustakawan/${id}`)
    return response.data
}

export const prodiNonaktifAkun = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/pustakawan/nonaktif/${id}`)
    return response.data
}

export const prodiAktifkan = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/pustakawan/aktifkan/${id}`)
    return response.data
}