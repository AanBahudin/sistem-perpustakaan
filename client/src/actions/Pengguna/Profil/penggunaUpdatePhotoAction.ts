import { customFetch } from "@/utils/customFetch";

// REFACTOR
// ERROR HANDLING MENGGUNAKAN TOAST

const penggunaUpdatePhoto = async(formData: FormData) => {
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

export default penggunaUpdatePhoto