import { customFetch } from "@/utils/customFetch";

const prodiVerifikasiPenggunaAction = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/pengguna/verify/${id}`)
    return response.data
}

export default prodiVerifikasiPenggunaAction