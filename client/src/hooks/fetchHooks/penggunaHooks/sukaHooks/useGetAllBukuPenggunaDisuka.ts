import { useQueries } from "@tanstack/react-query"
import { penggunaGetProfileAction } from "@/actions/Pengguna/Profil"
import { getAllSukaPengguna } from "@/actions/Pengguna/Suka"

const useGetAllBukuPenggunaDisuka = () => {

    const datas = useQueries({
    queries: [
            {
                queryKey: ['suka'],
                queryFn: getAllSukaPengguna
            },
            {
                queryKey: ['pengguna', 'profil'],
                queryFn: penggunaGetProfileAction
            }
        ]
    })

  const [dataSimpanan, profil] = datas
  const isLoading = datas.some(q => q.isLoading)

  const { data: dataBukuDisukai } = dataSimpanan
  const { data: dataProfil } = profil


  return {
    isLoading,
    dataBukuDisukai,
    dataProfil
  }

}

export default useGetAllBukuPenggunaDisuka