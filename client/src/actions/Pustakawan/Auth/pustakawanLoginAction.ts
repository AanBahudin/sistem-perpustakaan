import { customFetch } from "@/utils/customFetch";

const pustakawanLoginAction = async(data: any) => {
    const {data: response} = await customFetch.post('/auth/login/pustakawan', data)
    return response
}

export default pustakawanLoginAction