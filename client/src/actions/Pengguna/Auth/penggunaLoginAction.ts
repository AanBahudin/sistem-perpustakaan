import { customFetch } from "@/utils/customFetch"

const penggunaLoginAction = async(formData: FormData) => {
    const loginData = Object.fromEntries(formData)
    const {data: response} = await customFetch.post('/auth/login', loginData)

    if (response.status >= 400) {
        return {message: 'Terjadi Kesalahan', deskripsi: 'Email tidak ditemukan'}
    }

    return response.data
}

export default penggunaLoginAction