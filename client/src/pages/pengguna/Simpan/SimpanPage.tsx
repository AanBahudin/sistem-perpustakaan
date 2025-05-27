import { getAllSimpanan } from "@/actions/simpanActions"
import SimpanSearch from "@/components/pengguna/Simpan/SimpanSearch"
import Container from "@/globals/Container"
import { defer, useLoaderData } from "react-router-dom"
import SimpananBooks from "./SimpananBooks"
import AwaitHooks from "@/hooks/AwaitHooks"
import SukaLoading from "@/components/Loading/SukaLoading"

export const bukuTersimpanLoader = async() => {
  return defer({
    tersimpan: getAllSimpanan()
  })
}

const SimpanPage = () => {

  const {tersimpan} = useLoaderData() as {tersimpan: Promise<any>}


  return (
    <Container className="my-20">
      <SimpanSearch />

      <AwaitHooks data={tersimpan} loadingComponent={<SukaLoading />}>
        {(data) => <SimpananBooks books={data.bukuDisimpan} />}
      </AwaitHooks>
    </Container>
  )
}

export default SimpanPage