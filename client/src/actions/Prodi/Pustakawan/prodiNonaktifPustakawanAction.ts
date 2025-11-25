import { customFetch } from "@/utils/customFetch";

const prodiNonaktifAkunAction = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/pustakawan/nonaktif/${id}`)
    return response.data
}

export default prodiNonaktifAkunAction  