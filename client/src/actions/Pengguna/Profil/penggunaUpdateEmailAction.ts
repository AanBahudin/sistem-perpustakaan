import { customFetch } from "@/utils/customFetch";

// REFACTOR
// ERROR HANDLING MENGGUNAKAN TOAST

export const penggunaUpdateEmail = async(formData: FormData) => {
    const inputData = Object.fromEntries(formData)
    const response = await customFetch.patch('/user/update/email', inputData)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui email'}
    }
}

export default penggunaUpdateEmail