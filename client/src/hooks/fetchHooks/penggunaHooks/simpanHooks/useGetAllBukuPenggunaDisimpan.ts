import { useQuery } from "@tanstack/react-query"
import { getAllSimpananPengguna } from "@/actions/Pengguna/Simpan"

const useGetAllBukuPenggunaDisimpan = () => {

    const {data, isLoading} = useQuery({
        queryKey: ['simpan'],
        queryFn: getAllSimpananPengguna
            
    })

    return {
        isLoading,
        data,
    }


}

export default useGetAllBukuPenggunaDisimpan