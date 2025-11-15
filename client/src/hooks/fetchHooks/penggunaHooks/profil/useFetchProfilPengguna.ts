import { profileAction } from "@/actions/userActions"
import { useQuery } from "@tanstack/react-query"


const useFetchProfilPengguna = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['pengguna', 'profil'],
        queryFn: profileAction
    })

    return {
        isLoading,
        data
    }
}

export default useFetchProfilPengguna