import { customFetch } from "@/utils/customFetch";

const prodiLogoutAction = async() => {
    const {data: response} = await customFetch.get('/auth/logout')
    return response.data
}

export default prodiLogoutAction