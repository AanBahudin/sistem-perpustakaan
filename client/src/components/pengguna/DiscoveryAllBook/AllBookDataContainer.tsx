import BookGrid from "../KatalogBukuPengguna/BookGrid"
import BookPagination from "../KatalogBukuPengguna/BookPagination"
import { useGetAllBukuPengguna } from "@/hooks/fetchHooks/penggunaHooks/bukuHooks"
import AllBookLoading from "./AllBookLoading"

const AllBookDataContainer = () => {

    const { data, isLoading } = useGetAllBukuPengguna()
    console.log(data)
    if (isLoading) return <AllBookLoading />

    return (
        <>
            <main className="my-10">
                <BookGrid dataBuku={data.data}  />      
            </main>
            <BookPagination totalPage={data.totalPage || 0} />
        </>
    )
}

export default AllBookDataContainer