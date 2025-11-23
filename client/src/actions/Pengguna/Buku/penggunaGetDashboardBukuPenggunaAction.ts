import { customFetch } from "@/utils/customFetch"

const getDashboardBookAction = async() => {
    const {data: response} = await customFetch.get('/buku/katalog/user')
    return response.data
}

export default getDashboardBookAction