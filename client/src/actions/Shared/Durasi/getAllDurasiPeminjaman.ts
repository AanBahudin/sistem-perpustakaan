import { customFetch } from "@/utils/customFetch";

const getAllDurasiPeminjaman = async() => {
    const response = await customFetch.get('/durasi')
    return response.data.data
}

export default getAllDurasiPeminjaman