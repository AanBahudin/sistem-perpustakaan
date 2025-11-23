import { customFetch } from "@/utils/customFetch"

type ActionType = {
    query?: string
}

const getAllBuku = async({ query } : ActionType) => {
    const {data: response, status} = await customFetch.get(`/buku/user?${query || ''}`) 
    if (status >= 400) throw new Error('Gagal mengambil buku')
    
    return response.data
}

export default getAllBuku