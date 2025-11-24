import { customFetch } from "@/utils/customFetch";

type ActionType = {
    data: any
}

const pustakawanTambahDurasiAction = async({data} : ActionType) => {
    const { data: response } = await customFetch.post('/durasi', data)
    return response.data
}

export default pustakawanTambahDurasiAction