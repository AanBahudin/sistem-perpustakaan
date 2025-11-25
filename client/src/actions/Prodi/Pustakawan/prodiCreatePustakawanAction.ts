import { customFetch } from "@/utils/customFetch";

const prodiCreatePustakawanAction = async(data: any) => {
    const {data: response} = await customFetch.post('/prodi/create/pustakawan', data)
    return response.data
}

export default prodiCreatePustakawanAction