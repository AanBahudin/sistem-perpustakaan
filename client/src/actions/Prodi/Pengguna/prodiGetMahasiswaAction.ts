import { customFetch } from "@/utils/customFetch";

const prodiGetMahasiswaAction = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/mahasiswa?${params}`)
    return response.data
}

export default prodiGetMahasiswaAction