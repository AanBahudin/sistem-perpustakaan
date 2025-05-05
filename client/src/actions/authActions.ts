import { customFetch } from "@/utils/customFetch";
import { QueryClient } from "@tanstack/react-query";
import { redirect, useNavigate } from "react-router-dom";

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
                return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
            }
            return response.data.message
        }
    })

    return {message: message, deskripsi: 'Selamat Datang di Akun Anda', redirectTo: '/status/account'}
}

export const logoutAction = async(formData: FormData) => {
    await queryClient.ensureQueryData({
        queryKey: ['logout'],
        queryFn: async() => {
            const response = await customFetch.get('/auth/logout')
            if (response.data.status >= 400) return 'Terjadi kesalahan'
            return response.data.message
        }
    })

    return {message: 'Anda Keluar', deskripsi: 'Logout berhasil', redirectTo: '/login'}
}

export const accountStatus = async() => {
    const data = await queryClient.ensureQueryData({
        queryKey: ['verify'],
        queryFn: async() => {
            const response = await customFetch.get('/user/profile')
            if (response.data.status >= 400) return redirect('/login')
            return response.data.data
        }
    })
    return data
}