import { customFetch } from "@/utils/customFetch"

// REFACTOR
// ERROR HANDLING MENGGUNAKAN TOAST

const getProfilePengguna = async() => {
    const response = await customFetch.get('/user/profile')
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
    }
    return response.data.data
}

export default getProfilePengguna