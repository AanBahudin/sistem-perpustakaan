import { penggunaGetProfileAction } from "@/actions/Pengguna/Profil"
import { useQueries } from "@tanstack/react-query"
import { getAllSimpananPengguna } from "@/actions/Pengguna/Simpan"

const useGetAllBukuPenggunaDisimpan = () => {

    const datas = useQueries({
    queries: [
            {
                queryKey: ['simpan'],
                queryFn: getAllSimpananPengguna
            },
            {
                queryKey: ['pengguna', 'profil'],
                queryFn: penggunaGetProfileAction
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