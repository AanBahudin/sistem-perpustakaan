import { useQuery } from "@tanstack/react-query"
import { getAllSukaPengguna } from "@/actions/Pengguna/Suka"

const useGetAllBukuPenggunaDisuka = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['suka'],
    queryFn: getAllSukaPengguna
  })

  return {
    isLoading,
    data
  }

}

export default useGetAllBukuPenggunaDisuka