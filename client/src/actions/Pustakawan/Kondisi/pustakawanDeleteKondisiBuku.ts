import { customFetch } from "@/utils/customFetch"

export const pustakawanDeleteKondisiBukuAction = async(idKondisi: string) => {
    const {data: response} = await customFetch.delete(`/kondisi/${idKondisi}`)
    return response.data
} 

export default pustakawanDeleteKondisiBukuAction