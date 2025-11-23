import { customFetch } from "@/utils/customFetch"

const penggunaGetDetailPerpanjangan = async(id: string) => {
    const response = await customFetch.get(`/perpanjangan/user/${id}`)
    return response.data.data || {}
}

export default penggunaGetDetailPerpanjangan