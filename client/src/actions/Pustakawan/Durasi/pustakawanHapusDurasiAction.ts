import { customFetch } from "@/utils/customFetch";

type ActionType = {
    idDurasi: string
}

const pustakawanDeleteDurasiAction = async({idDurasi} : ActionType) => {
    const {data: response} = await customFetch.delete(`/durasi/${idDurasi}`)
    return response.data
}

export default pustakawanDeleteDurasiAction