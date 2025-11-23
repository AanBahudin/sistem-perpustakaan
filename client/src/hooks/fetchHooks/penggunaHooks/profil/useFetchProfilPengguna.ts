import { penggunaGetProfileAction } from "@/actions/Pengguna/Profil"
import { useQuery } from "@tanstack/react-query"


const useFetchProfilPengguna = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['pengguna', 'profil'],
        queryFn: penggunaGetProfileAction
    })

    return {
        isLoading,
        data
    }
}

export default useFetchProfilPengguna