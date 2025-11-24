import { customFetch } from "@/utils/customFetch"

const pustakawanEditKondisiBukuAction = async(data: any, idKondisi: string) => {
    const { data: response } = await customFetch.patch(`/kondisi/${idKondisi}`, data)
    return response.data
}

export default pustakawanEditKondisiBukuAction