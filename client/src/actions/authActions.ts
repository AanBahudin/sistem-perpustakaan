import { customFetch } from "@/utils/customFetch";
import { redirect } from "react-router-dom";
import { toast } from "sonner";


export const registerAction = async(formData: FormData) => {
    const registerData = Object.fromEntries(formData)
    const response = await customFetch.post('/auth/register', registerData)

    if (response.status >= 400) return 'Terjadi Kesalahan'
    return response.data.message
}

export const loginAction = async(formData: FormData) => {
    const loginData = Object.fromEntries(formData)
    const {data: response} = await customFetch.post('/auth/login', loginData)

    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
    }

    return response.data
}

export const logoutAction = async() => {
    const {data} = await customFetch.get('/auth/logout')
    toast(data.message, {description: 'Anda telah keluar dari Perpustakaan'})
}

export const accountStatus = async() => {
    const response = await customFetch.get('/user/check/account/user')
    
    if (response.data.status >= 400 || null) return redirect('/login')
    return response.data.data || {}

}