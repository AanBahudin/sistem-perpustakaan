import { customFetch } from "@/utils/customFetch"

type ActionType = {
    data: FormData
}

const pustakawanCreateBukuAction = async({data} : ActionType) => {
    const {data: response} = await customFetch.post('/buku/create', data)
    return response.data
}

export default pustakawanCreateBukuAction