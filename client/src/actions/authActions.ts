import { customFetch } from "@/utils/customFetch";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import { toast } from "sonner";

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

    const response = await queryClient.ensureQueryData({
        queryKey: ['login'],
        queryFn: async() => {
            const response = await customFetch.post('/auth/login', loginData)

            if (response.status >= 400) {
                return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
            }

            const {verifikasiEmail, verifikasiProdi} = response.data.data 
            return {
                message: response.data.message,
                verifikasiEmail,
                verifikasiProdi
            }
        }
    })

    const url = response.verifikasiEmail && response.verifikasiProdi ? '/user' : '/status/account'

    return {message: response.message, deskripsi: 'Selamat Datang di Akun Anda', redirectTo: url}
}

export const logoutAction = async() => {
    const {data} = await customFetch.get('/auth/logout')
    toast(data.message, {description: 'Anda telah keluar dari Perpustakaan'})
    // queryClient.removeQueries({ queryKey: ['verify', 'login'] })
    queryClient.clear()
}

export const accountStatus = async() => {
    const data = await queryClient.fetchQuery({
        queryKey: ['verify'],
        queryFn: async() => {
            const response = await customFetch.get('/user/profile')
            console.log(response);
            
            if (response.data.status >= 400 || null) return redirect('/login')
            return response.data.data
        }
    })
    return data
}