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

export const updateNamaAction = async(formData: FormData) => {
    const inputData = Object.fromEntries(formData)

    const response = await customFetch.patch('/user/update/profil', inputData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui nama'}
    }
    queryClient.setQueryData(['profil'], response.data.data)
    return {message: 'Profil Diperbaharui', deskripsi: 'Nama telah diperbaharui', redirectTo: '/user/profil'}
}

export const updateKelasAction = async(formData: FormData) => {
    console.log('update update function');
}

export const updateNohpAction = async(formData: FormData) => {
    console.log('update nohp function');
}

export const updateEmailAction = async(formData: FormData) => {
    console.log('update email function');
}

export const updatePasswordAction = async(formData: FormData) => {
    console.log('update password function');
}