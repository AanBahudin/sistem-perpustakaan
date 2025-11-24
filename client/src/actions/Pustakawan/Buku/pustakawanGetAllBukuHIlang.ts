import { customFetch } from "@/utils/customFetch";

type ActionType = {
    query: string
}

const pustakawanGetAllBukuHilangAction = async({query} : ActionType) => {
    const {data: response} = await customFetch.get(`/buku/pustakawan/dihilangkan?${query}`)
    return response.data
}

export default pustakawanGetAllBukuHilangAction