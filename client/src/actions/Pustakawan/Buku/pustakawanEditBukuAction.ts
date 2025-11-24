import { customFetch } from "@/utils/customFetch"

type ActionType = {
    data: any,
    idBuku: string
}

const pustakawanEditBukuAction = async({data, idBuku} : ActionType) => {
    const {data: response} = await customFetch.patch(`/buku/pustakawan/${idBuku}`, data)
    return response.data
}

export default pustakawanEditBukuAction