import { customFetch } from "@/utils/customFetch";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import { toast } from "sonner";

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const profileAction = async() => {
    const response = await queryClient.ensureQueryData({
        queryKey: ['profil'],
        queryFn: async() => {
            const response = await customFetch.get('/user/profile')

            if (response.status >= 400) {
                return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
            }
        }
    })

    return response
}