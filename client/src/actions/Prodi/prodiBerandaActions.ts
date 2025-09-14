import { customFetch } from "@/utils/customFetch";

export const prodiBerandaData = async() => {
    const {data: response} = await customFetch.get('/prodi/beranda/stats')
    return response.data
}