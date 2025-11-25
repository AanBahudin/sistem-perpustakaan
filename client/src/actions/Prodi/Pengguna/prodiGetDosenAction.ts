import { customFetch } from "@/utils/customFetch";

const prodiGetDosenAction = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/dosen?${params}`)
    return response.data
}

export default prodiGetDosenAction