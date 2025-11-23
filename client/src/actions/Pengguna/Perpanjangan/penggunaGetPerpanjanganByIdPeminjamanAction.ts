import { customFetch } from "@/utils/customFetch"

type ActionType = {
    idPeminjaman: string
}

const penggunaGetPerpanjanganByPinjamanId = async({idPeminjaman} : ActionType) => {
    const response = await customFetch.get(`/perpanjangan/user/peminjaman/${idPeminjaman}`)
    return response.data.data || {}
}

export default penggunaGetPerpanjanganByPinjamanId