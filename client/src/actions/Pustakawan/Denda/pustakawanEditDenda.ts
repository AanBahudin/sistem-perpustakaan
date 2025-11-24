import { customFetch } from "@/utils/customFetch"

const pustakawanEditNominalDenda = async(data: any, idDenda: string) => {
    const {data: response} = await customFetch.patch(`/denda/${idDenda}`, data)
    return response.data
}

export default pustakawanEditNominalDenda