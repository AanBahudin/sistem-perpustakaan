import { customFetch } from "@/utils/customFetch"
import { queryClient } from "@/main"

export const getPengembalianData = async(search? : string) => {
    const data = await queryClient.ensureQueryData({
            queryKey: ['pengembalian',search],
            queryFn: async() => {
                const response = await customFetch.get(`/pengembalian/user?${search}`)
                if (response.status >= 400) {
                    return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data pengembalian'}
                }
                return response.data      
            }
        })
    return data
}