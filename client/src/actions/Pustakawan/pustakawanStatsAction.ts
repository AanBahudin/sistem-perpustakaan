import { customFetch } from "@/utils/customFetch"

export const getStatsPustakawan = async() => {
    const {status, data: response} = await customFetch.get('/pustakawan/stats')
    if (status >= 400) {
        return {message: 'Error'}
    }
    console.log(response.data)
    return response.data
}