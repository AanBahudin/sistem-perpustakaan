import { profileAction } from "@/actions/userActions"
import { useQueries } from "@tanstack/react-query"
import { getAllSimpanan } from "@/actions/simpanActions"

const useGetAllBukuPenggunaDisimpan = () => {

    const datas = useQueries({
    queries: [
            {
                queryKey: ['simpan'],
                queryFn: getAllSimpanan
            },
            {
                queryKey: ['pengguna', 'profil'],
                queryFn: profileAction
            }
        ]
    })

    const [dataSimpanan, profil] = datas
    const isLoading = datas.some(q => q.isLoading)

    const { data: dataBukuDisimpan } = dataSimpanan
    const { data: dataProfil } = profil

    return {
        isLoading,
        dataProfil,
        dataBukuDisimpan
    }


}

export default useGetAllBukuPenggunaDisimpan