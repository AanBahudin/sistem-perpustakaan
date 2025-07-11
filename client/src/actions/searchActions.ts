import { customFetch } from "@/utils/customFetch"

export const searchBook = async(title: string | any) => {
    const response = await customFetch.get(`/search?title=${title}`)
    console.log(response.data.data)
    return response.data
}