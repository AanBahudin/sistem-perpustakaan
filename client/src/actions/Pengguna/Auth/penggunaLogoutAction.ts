import { customFetch } from "@/utils/customFetch"

const penggunaLogoutAction = async() => {
    await customFetch.get('/auth/logout')
}

export default penggunaLogoutAction