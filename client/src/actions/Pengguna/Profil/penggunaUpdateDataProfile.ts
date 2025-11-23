import { customFetch } from "@/utils/customFetch";

// REFACTOR
// ERROR HANDLING MENGGUNAKAN TOAST

const penggunaUpdateDataProfile = async(data: any) => {
    const response = await customFetch.patch('/user/update/profil', data)
    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Tidak dapat memperbaharui nama'}
    }
}

export default penggunaUpdateDataProfile