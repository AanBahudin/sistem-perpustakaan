import { customFetch } from "@/utils/customFetch"

type ActionType = {
    data: any,
    idBuku: string
}

const pustakawanEditBukuAction = async({data, idBuku} : ActionType) => {
    console.log(data)
    const {data: response} = await customFetch.patch(`/buku/pustakawan/${idBuku}`, data)
    console.log(response)
    return response.data
}

export default pustakawanEditBukuAction