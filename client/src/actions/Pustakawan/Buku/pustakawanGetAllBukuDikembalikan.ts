import { customFetch } from "@/utils/customFetch";

const pustakawanGetAllBukuDikembalikanAction = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/buku/pustakawan/dikembalikan?${query}`)
    return response.data
}

export default pustakawanGetAllBukuDikembalikanAction