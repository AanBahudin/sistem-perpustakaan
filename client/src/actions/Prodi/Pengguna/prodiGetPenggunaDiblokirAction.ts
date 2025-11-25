import { customFetch } from "@/utils/customFetch";

const prodiGetPenggunaDiblokirAction = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/blocked?${params}`)
    return response.data
}

export default prodiGetPenggunaDiblokirAction