import { customFetch } from "@/utils/customFetch";

const prodiCreatePenggunaAction = async(data: any) => {
    const {data: response} = await customFetch.post('/prodi/create/pengguna', data)
    return response
}

export default prodiCreatePenggunaAction