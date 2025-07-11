import { customFetch } from "@/utils/customFetch"

export const searchBook = async(title: string | any) => {
    const response = await customFetch.get(`/search?title=${title}`)
    return response.data.data
}