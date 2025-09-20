import { customFetch } from "@/utils/customFetch";

export const profileAction = async() => {
    const response = await customFetch.get('/user/profile')
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
    }
    return response.data.data
}

export const getStats = async() => {
    const response = await customFetch.get('/user/profile/stats')
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
    }
    return response.data.data
}

export const updateProfileAction = async(formData: FormData) => {
    const inputData = Object.fromEntries(formData)
    const response = await customFetch.patch('/user/update/profil', inputData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui nama'}
    }
}

export const updatePhotoAction = async(formData: FormData) => {
    const file = formData.get('fotoProfil') as File
    if (file && file.size > 200000) {
        return {message: 'Terjadi kesalahan', deskripsi: 'Ukuran foto maksimal 4000 MB'}
    }

    const response = await customFetch.patch('/user/update/photo', formData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui foto'}
    }

    return response.data.data
}

export const updateEmailAction = async(formData: FormData) => {
    const inputData = Object.fromEntries(formData)
    const response = await customFetch.patch('/user/update/email', inputData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui email'}
    }
}

export const updatePasswordAction = async(formData: FormData) => {
    const inputData = Object.fromEntries(formData)
    
    const response = await customFetch.patch('/user/update/password', inputData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui password'}
    }
}