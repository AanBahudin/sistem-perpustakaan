import { customFetch } from "@/utils/customFetch";

const prodiGetAllPustakawanAction = async(query: string) => {
    const { data: response } = await customFetch.get(`/prodi/pustakawan?${query}`)
    return response.data
}

export default prodiGetAllPustakawanAction