import { customFetch } from "@/utils/customFetch";

const prodiLoginAction = async(data: any) => {
    const {data: response} = await customFetch.post('/auth/login/prodi', data)
    return response.data
}

export default prodiLoginAction