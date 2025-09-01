import { customFetch } from "@/utils/customFetch";

export const getDenda = async() => {
    const {data: response} = await customFetch.get('/denda/withId')
    return response.data
}

export const pustakawanEditDenda = async(data: any, idDenda: string) => {
    const {data: response} = await customFetch.patch(`/denda/${idDenda}`, data)
    return response.data
}