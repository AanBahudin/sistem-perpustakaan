import { customFetch } from "@/utils/customFetch";

const prodiGetPenggunaMendaftarAction = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/requested//user?${params}`)
    return response.data
}

export default prodiGetPenggunaMendaftarAction