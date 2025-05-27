import { getAllSimpanan } from "@/actions/simpanActions"
import SimpanSearch from "@/components/pengguna/Simpan/SimpanSearch"
import Container from "@/globals/Container"
import { defer, useLoaderData } from "react-router-dom"
import SimpananBooks from "./SimpananBooks"
import AwaitHooks from "@/hooks/AwaitHooks"
import SukaLoading from "@/components/Loading/SukaLoading"
import { getAllSuka } from "@/actions/sukaActions"

export const bukuTersimpanLoader = async() => {
  return defer({
    tersimpan: getAllSimpanan(),
    disukai: getAllSuka()
  })
}

const SimpanPage = () => {

  const {tersimpan, disukai} = useLoaderData() as {tersimpan: Promise<any>, disukai: Promise<any>}
  const semuaData = Promise.all([tersimpan, disukai])


  return (
    <Container className="my-20">
      <SimpanSearch />

      <AwaitHooks data={semuaData} loadingComponent={<SukaLoading />}>
        {(data) => <SimpananBooks books={data[0].bukuDisimpan} likedData={data[1]} />}
      </AwaitHooks>
    </Container>
  )
}

export default SimpanPage