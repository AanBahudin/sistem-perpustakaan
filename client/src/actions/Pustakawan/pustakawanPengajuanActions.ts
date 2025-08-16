import { customFetch } from "@/utils/customFetch";

export const getAllPengajuan = async() => {
    const {data: response} = await customFetch.get('/pustakawan/pengajuan')
    return response.data
}

export const getAllPengajuanPeminjaman = async({params} : {params: string}) => {
    const {data: response} = await customFetch.get(`/pustakawan/peminjaman?${params}`)
    return response.data
}

export const getDetailPengajuanPeminjaman = async({id} : {id: string}) => {
    const {data: response} = await customFetch.get(`/pustakawan/peminjaman/${id}`)
    console.log(response.data)
    return response.data
}

export const tolakPengajuanPeminjaman = async({idPeminjaman} : {idPeminjaman: string}) => {
    const response = await customFetch.get(`/pinjaman/decline/${idPeminjaman}`)
    return response
}