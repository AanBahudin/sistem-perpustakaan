import { customFetch } from "@/utils/customFetch"

export const searchBook = async(title: string | any) => {
    const response = await customFetch.get(`/search/typed?title=${title}`)
    console.log(response.data)
    return response.data.data
}

export const searchBookPageDataLoader = async(params: string) => {
    const response = await customFetch.get(`/search?${params}`)
    return response.data.data
}