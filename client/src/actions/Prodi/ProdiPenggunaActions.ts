import { customFetch } from "@/utils/customFetch";

export const prodiCreatePengguna = async(data: any) => {
    const {data: response} = await customFetch.post('/prodi/create/pengguna', data)
    return response
}

export const prodiGetAllPengguna = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/pengguna?${params}`)
    return response.data
}

export const prodiGetSinglePengguna = async(id: string) => {
    const {data: response} = await customFetch.get(`/prodi/pengguna/${id}`)
    return response.data
}

export const prodiGetPenggunaDosen = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/dosen?${params}`)
    return response.data
}

export const prodiGetPenggunaMahasiswa = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/mahasiswa?${params}`)
    return response.data
}

export const prodiGetRequestedUser = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/requested//user?${params}`)
    return response.data
}

export const prodiVerifyUserAccount = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/pengguna/verify/${id}`)
    return response.data
}

export const prodiCreatePustakawan = async(data: any) => {
    const { data: response } = await customFetch.post('/prodi/create/pustakawan', data)
    return response.data
}

export const prodiBlockedUser = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/user/${id}`)
    return response.data
}

export const prodiUnblockedUser = async(id: string) => {
    const {data: response} = await customFetch.patch(`/prodi/user/unblocked/${id}`)
    return response.data
}

export const prodiGetUserBlocked = async(params: string) => {
    const {data: response} = await customFetch.get(`/prodi/user/blocked?${params}`)
    return response.data
}