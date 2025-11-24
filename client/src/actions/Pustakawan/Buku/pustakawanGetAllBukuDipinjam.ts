import { customFetch } from "@/utils/customFetch"

type ActionType = {
    query: string
}

const getAllBukuDipinjamPustakawanAction = async({query} : ActionType) => {
    const {data: response} = await customFetch.get(`/buku/pustakawan/dipinjam?${query}`)
    return response.data
}

export default getAllBukuDipinjamPustakawanAction