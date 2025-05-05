import { customFetch } from "@/utils/customFetch";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const registerAction = async(formData: FormData) => {
    const registerData = Object.fromEntries(formData)

    const message = await queryClient.ensureQueryData({
        queryKey: ['register'],
        queryFn: async() => {
            const response = await customFetch.post('/auth/register', registerData)

            if (response.status >= 400) return 'Terjadi Kesalahan'
            return response.data.message
        }
    })

    return {message: message, deskripsi: 'Cek email anda untuk verifikasi'}
}

export const loginAction = async(formData: FormData) => {
    const loginData = Object.fromEntries(formData)

    const message = await queryClient.ensureQueryData({
        queryKey: ['login'],
        queryFn: async() => {
            const response = await customFetch.post('/auth/login', loginData)

            if (response.status >= 400) {
                console.log(response.data.message)
                return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
            }
            return response.data.message
        }
    })

    return {message: message, deskripsi: 'Selamat Datang di Akun Anda'}
}

export const accountStatus = async() => {
    const data = await queryClient.ensureQueryData({
        queryKey: ['verify'],
        queryFn: async() => {
            const response = await customFetch.get('/user/profile')
            if (response.status >= 400) redirect('/')
            return response.data.data
        }
    })

    return data
}