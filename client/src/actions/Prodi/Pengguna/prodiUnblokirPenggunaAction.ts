import { customFetch } from "@/utils/customFetch";

const prodiUnblokirPenggunaAction = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/user/unblocked/${id}`)
    return response.data
}

export default prodiUnblokirPenggunaAction

