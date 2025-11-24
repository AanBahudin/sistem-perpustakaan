import { customFetch } from "@/utils/customFetch"

const getAllKondisi = async() => {
    const {data: response} = await customFetch.get('/kondisi')
    return response.data
}

export default getAllKondisi