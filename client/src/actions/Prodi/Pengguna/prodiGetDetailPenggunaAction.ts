import { customFetch } from "@/utils/customFetch";

const prodiGetDetailPenggunaAction = async(id: string) => {
    const {data: response} = await customFetch.get(`/prodi/pengguna/${id}`)
    return response.data
}

export default prodiGetDetailPenggunaAction