import { getAllBuku, getDetailBuku } from "@/actions/BukuActions"
import { getAllSimpanan } from "@/actions/simpanActions"
import { getAllSuka } from "@/actions/sukaActions"
import BookLoading from "@/components/Loading/BookLoading"
import Container from "@/globals/Container"
import AwaitHooks from "@/hooks/AwaitHooks"
import { defer, useLoaderData } from "react-router-dom"
import DetailBookContainer from "../../../components/pengguna/DetailBukuPengguna/DetailBookContainer"
import YouMayLIkeBookContainer from "@/components/pengguna/DetailBukuPengguna/YouMayLIkeBookContainer"

type AllDataDetailBook = {
  detailBuku: any,
  disimpan: any,
  disukai: any
  semuaBuku: any
}

export const detailBookLoader = async({params} : {params: any}) => {
  const {id} = params
  return defer({
    detailBuku: getDetailBuku(id),
    disimpan: getAllSimpanan(),
    semuaBuku: getAllBuku(),
    disukai: getAllSuka()
  })
}

const DetailBuku = () => {

  const {detailBuku, disimpan, disukai, semuaBuku} = useLoaderData() as AllDataDetailBook
  const allData = Promise.all([detailBuku, disimpan, disukai, semuaBuku])


  return (
    <Container className="my-20">
      <AwaitHooks data={allData} loadingComponent={<BookLoading />}>
        {(data) => <DetailBookContainer bookData={data[0]} savedData={data[1].bukuDisimpan} likedData={data[2].bukuDisukai} />}
      </AwaitHooks>

      <AwaitHooks data={allData} loadingComponent={<BookLoading />}>
        {(data) => <YouMayLIkeBookContainer
          saved={data[1].bukuDisimpan} 
          liked={data[2]}
          books={data[3].data} />}
        
      </AwaitHooks>
    </Container>
  )
}

export default DetailBuku