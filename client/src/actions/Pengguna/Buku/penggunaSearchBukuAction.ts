import { customFetch } from "@/utils/customFetch";

const penggunaSearchBookAction = async(title: string | any) => {
    const response = await customFetch.get(`/search/typed?title=${title}`)
    return response.data.data
}

export default penggunaSearchBookAction