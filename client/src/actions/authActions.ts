import { customFetch } from "@/utils/customFetch";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5}}
})

export const registerAction = async(formData: FormData) => {
    const registerData = Object.fromEntries(formData)

    const message = await queryClient.ensureQueryData({
        queryKey: ['register'],
        queryFn: async() => {
            const response = await customFetch.post('/auth/register', registerData)
            return response.data.message
        }
    })

    return message
}