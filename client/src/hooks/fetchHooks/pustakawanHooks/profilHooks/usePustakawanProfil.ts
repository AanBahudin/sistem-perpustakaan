import { getProfilePustakawan } from "@/actions/Pustakawan/Profil/pustakawanProfileActions"
import { useQuery } from "@tanstack/react-query"

const usePustakawanProfil = () => {
    const {isLoading, data} = useQuery({
        queryKey: ['pustakawan', 'profil'],
        queryFn: getProfilePustakawan
    })

    return {isLoading, data}

}

export default usePustakawanProfil