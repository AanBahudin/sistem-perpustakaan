import { customFetch } from "@/utils/customFetch"
import { redirect } from "react-router-dom"

const penggunaAccountStatus = async() => {
    const response = await customFetch.get('/user/check/account/user')
    
    if (response.data.status >= 400 || null) return redirect('/login')
    return response.data.data || {}

}

export default penggunaAccountStatus