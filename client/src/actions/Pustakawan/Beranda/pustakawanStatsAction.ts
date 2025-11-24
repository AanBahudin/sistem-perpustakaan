import { customFetch } from "@/utils/customFetch"

const getStatsPustakawan = async() => {
    const {status, data: response} = await customFetch.get('/pustakawan/stats')
    if (status >= 400) {
        return {message: 'Error'}
    }
    return response.data
}

export default getStatsPustakawan