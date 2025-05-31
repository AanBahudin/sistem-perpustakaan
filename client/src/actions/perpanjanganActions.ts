import { customFetch } from "@/utils/customFetch";
import { queryClient } from "@/main";

export const getPerpanjangan = async(query: string) => {
    const data = await queryClient.ensureQueryData({
        queryKey: ['perpanjangan', query],
        queryFn: async() => {
            const response = await customFetch.get(`/perpanjangan/user?${query}`)
            if (response.status >= 400) {
                return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat mengambil data perpanjangan saat ini.'}
            }
            return response.data
        }
    })
    return data
}
