import { customFetch } from "@/utils/customFetch";

type ActionType = {
    query: string
}

const pustakawanGetAllBukuAction = async({query} : ActionType) => {
    const {data: response} = await customFetch.get(`/buku/pustakawan?${query}`)
    return response.data
}

export default pustakawanGetAllBukuAction