import { customFetch } from "@/utils/customFetch"

const getDetailPengembalianPengguna = async(id: string) => {
    const response = await customFetch.get(`/pengembalian/user/${id}`)
    return response.data.data
}

export default getDetailPengembalianPengguna