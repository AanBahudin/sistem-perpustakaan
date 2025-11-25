import { customFetch } from "@/utils/customFetch";

const prodiGetBerandaDataAction = async() => {
    const {data: response} = await customFetch.get('/prodi/beranda/stats')
    return response.data
}

export default prodiGetBerandaDataAction