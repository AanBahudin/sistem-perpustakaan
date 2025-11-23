import { customFetch } from "@/utils/customFetch"

const penggunaRegisterAction = async(formData: FormData) => {
    const registerData = Object.fromEntries(formData)
    const response = await customFetch.post('/auth/register', registerData)

    if (response.status >= 400) return 'Terjadi Kesalahan'
    return response.data.message
}

export default penggunaRegisterAction