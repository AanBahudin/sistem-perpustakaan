import { useQueries } from "@tanstack/react-query"
import { profileAction } from "@/actions/userActions"
import { getAllSuka } from "@/actions/sukaActions"

const useGetAllBukuPenggunaDisuka = () => {

    const datas = useQueries({
    queries: [
            {
                queryKey: ['suka'],
                queryFn: getAllSuka
            },
            {
                queryKey: ['pengguna', 'profil'],
                queryFn: profileAction
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