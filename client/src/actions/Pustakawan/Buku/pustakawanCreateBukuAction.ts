import { customFetch } from "@/utils/customFetch"

type ActionType = {
    data: any
}

const pustakawanCreateBukuAction = async({data} : ActionType) => {
    const {data: response} = await customFetch.post('/buku/create', data)
    return response.data
}

export default pustakawanCreateBukuAction