import { customFetch } from "@/utils/customFetch";

const prodiGetAllPenggunaAction = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/pengguna?${params}`)
    return response.data
}

export default prodiGetAllPenggunaAction