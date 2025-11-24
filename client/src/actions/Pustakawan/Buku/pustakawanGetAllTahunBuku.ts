import { customFetch } from "@/utils/customFetch"

const getAllTahunBukuPustakawanAction = async() => {
    const {data: response} = await customFetch.get('/buku/year')
    return response.data.yearRange
}

export default getAllTahunBukuPustakawanAction