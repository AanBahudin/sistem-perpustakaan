import { customFetch } from "@/utils/customFetch";

const getProdiProfilAction = async() => {
    const {data: response} = await customFetch.get('prodi/profile')
    return response.data
}

export default getProdiProfilAction