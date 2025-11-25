import { customFetch } from "@/utils/customFetch"

const prodiGetAllBukuAction = async(query: string) => {
    const {data: response} = await customFetch.get(`/buku/prodi?${query}`)
    return response.data
}

export default prodiGetAllBukuAction