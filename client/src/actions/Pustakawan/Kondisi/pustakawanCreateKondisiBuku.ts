import { customFetch } from "@/utils/customFetch"

const pustakawanCreateKondisiBukuAction = async(data: any) => {
    const {data: response} = await customFetch.post('/kondisi', data)
    return response.data
}

export default pustakawanCreateKondisiBukuAction