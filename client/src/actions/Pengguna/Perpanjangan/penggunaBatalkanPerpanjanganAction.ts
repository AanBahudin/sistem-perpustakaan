import { customFetch } from "@/utils/customFetch"

type ActionType = {
    idPerpanjangan: string
}

const penggunaBatalkanPerpanjangan = async({idPerpanjangan} : ActionType) => {
    const response = await customFetch.delete(`/perpanjangan/user/${idPerpanjangan}`)
    
    if (response.status >= 400) return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data perpanjangan saat ini.'}
    // queryClient.invalidateQueries({queryKey: ['detail-peminjaman', 'perpanjangan', idPerpanjangan]})
}

export default penggunaBatalkanPerpanjangan