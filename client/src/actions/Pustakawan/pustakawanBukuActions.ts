import { customFetch } from "@/utils/customFetch";

export const getAllBukuPustakawan = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/buku/pustakawan?${query}`)
    return response.data
}

export const getAllBukuDipinjamPustakawan = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/buku/pustakawan/dipinjam?${query}`)
    return response.data
}

export const getAllBukuDiperpanjanganPustakawan = async({query} : {query: string}) => {
    const {data: response} = await customFetch.get(`/buku/pustakawan/diperpanjang?${query}`)
    console.log(response.data)
    return response.data
}

export const getAllBooksPublishedYear = async() => {
    const {data: response} = await customFetch.get('/buku/year')
    return response.data.yearRange
}