import { customFetch } from "@/utils/customFetch";

type ActionType = {
    idBuku: string
}

const pustakawanGetSingleBukuAction = async({idBuku} : ActionType) => {
    const {data: response} = await customFetch.get(`/buku/pustakawan/${idBuku}`)
    return response.data
}

export default pustakawanGetSingleBukuAction