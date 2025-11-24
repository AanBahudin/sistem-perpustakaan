import { customFetch } from "@/utils/customFetch"

type ActionType = {
    data: any,
    idDurasi: string
}

const pustakawanEditDurasiAction = async({data, idDurasi} : ActionType) => {
    const {data: response} = await customFetch.patch(`/durasi/${idDurasi}`, data)
    return response.data
}

export default pustakawanEditDurasiAction