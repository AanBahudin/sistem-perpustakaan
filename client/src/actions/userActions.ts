import { removeSelectedImg } from "@/cart/profileSlice";
import { store } from "@/store";
import { customFetch } from "@/utils/customFetch";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const profileAction = async() => {
    const data = await queryClient.ensureQueryData({
        queryKey: ['profil'],
        queryFn: async() => {
            const response = await customFetch.get('/user/profile')
            if (response.status >= 400) {
                return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
            }
            return response.data.data      
        }
    })
    return data
}

export const updateProfileAction = async(formData: FormData) => {
    const inputData = Object.fromEntries(formData)
    const response = await customFetch.patch('/user/update/profil', inputData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui nama'}
    }
    queryClient.setQueryData(['profil'], response.data.data)
    return {message: 'Profil Diperbaharui', deskripsi: 'Data telah diperbaharui', redirectTo: '/user/profil'}
}

export const updatePhotoAction = async(formData: FormData) => {
    const file = formData.get('fotoProfil') as File
    console.log(file.size)

    if (file && file.size > 200000) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Ukuran foto maksimal 4000 MB'}
    }

    const response = await customFetch.patch('/user/update/photo', formData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui foto'}
    }

    queryClient.setQueryData(['profil'], response.data.data)
    store.dispatch(removeSelectedImg())
    return {message: 'Foto diupload', deskripsi: 'Photo telah diperbaharui', redirectTo: '/user/profil'}
}

export const updateEmailAction = async(formData: FormData) => {
    const inputData = Object.fromEntries(formData)
    const response = await customFetch.patch('/user/update/email', inputData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui email'}
    }

    queryClient.setQueryData(['profil'], response.data.data)
    return {message: 'Email Menunggu Diperbaharui', deskripsi: 'Silahkan cek email anda untuk verifikasi', redirectTo: '/user/profil'}
}

export const updatePasswordAction = async(formData: FormData) => {
    const inputData = Object.fromEntries(formData)
    
    const response = await customFetch.patch('/user/update/password', inputData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui password'}
    }

    queryClient.setQueryData(['profil'], response.data.data)
    return {message: 'Diperbaharui', deskripsi: 'Password telah diubah', redirectTo: '/user/profil/credentials'}
}