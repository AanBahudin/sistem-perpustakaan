import { customFetch } from "@/utils/customFetch";

const prodiBlokirPenggunaAction = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/user/${id}`)
    return response.data
}

export default prodiBlokirPenggunaAction