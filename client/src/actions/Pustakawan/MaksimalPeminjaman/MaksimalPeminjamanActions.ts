import { customFetch } from "@/utils/customFetch";

export const getMaksimalPeminjaman = async() => {
    const {data: response} = await customFetch.get('/maksPinjaman')
    return response.data
}

export const updateMaksimalPeminjaman = async({data, id} : {data: FormData, id: string}) => {
    const newData = Object.fromEntries(data)
    await customFetch.patch(`/maksPinjaman/${id}`, newData)
}