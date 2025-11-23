import { customFetch } from "@/utils/customFetch";

// REFACTOR
// ERROR HANDLING MENGGUNAKAN TOAST

const penggunaUpdatePassword = async(formData: FormData) => {
    const inputData = Object.fromEntries(formData)
    
    const response = await customFetch.patch('/user/update/password', inputData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui password'}
    }
}

export default penggunaUpdatePassword