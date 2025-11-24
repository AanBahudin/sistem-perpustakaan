import { customFetch } from "@/utils/customFetch";

type ActionHook = {
    query: string
}

const getAllBukuDiperpanjangPustakawanAction = async({query} : ActionHook) => {
    const {data: response} = await customFetch.get(`/buku/pustakawan/diperpanjang?${query}`)
    return response.data
}

export default getAllBukuDiperpanjangPustakawanAction