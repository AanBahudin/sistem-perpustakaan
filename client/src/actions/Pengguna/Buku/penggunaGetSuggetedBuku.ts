import { customFetch } from "@/utils/customFetch"

const getSuggestedBook = async({idBuku} : {idBuku: string}) => {
    const {data: response} = await customFetch.get(`/buku/suggested/${idBuku}`)
    return response.data
}

export default getSuggestedBook