import { customFetch } from "@/utils/customFetch"

const penggunaEditPerpanjangan = async({idPerpanjangan, data} : {idPerpanjangan: string, data: any}) => {
    const {data: response} = await customFetch.patch(`/perpanjangan/user/${idPerpanjangan}`, data)
    // if (postEdit.status >= 400) return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengedit data pengajuan perpanjangan saat ini.'}

    // queryClient.invalidateQueries({ queryKey: ['detail-perpanjangan', idPerpanjangan] })
    return response.data

}

export default penggunaEditPerpanjangan