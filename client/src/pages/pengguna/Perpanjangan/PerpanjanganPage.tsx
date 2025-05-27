import { getPerpanjangan } from '@/actions/perpanjanganActions'
import { getAllSimpanan } from '@/actions/simpanActions'
import { getAllSuka } from '@/actions/sukaActions'
import PeminjamanLoading from '@/components/pengguna/peminjamanPengguna/PeminjamanLoading'
import PerpanjanganDataLayout from '@/components/pengguna/PerpanjanganPengguna.tsx/PerpanjanganDataLayout'
import PerpanjanganSearch from '@/components/pengguna/PerpanjanganPengguna.tsx/PerpanjanganSearch'
import PerpanjanganTab from '@/components/pengguna/PerpanjanganPengguna.tsx/PerpanjanganTab'
import AwaitHooks from '@/hooks/AwaitHooks'
import { defer, useLoaderData } from 'react-router-dom'

type DataLoaderType = {
  perpanjangan: Promise<any>,
  tersimpan: Promise<any>,
  disukai: Promise<any>
}

export const perpanjanganLoader = async({request} : {request: Request}) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams.toString()

  return defer({
    perpanjangan: getPerpanjangan(searchParams),
    tersimpan: getAllSimpanan(),
    disukai: getAllSuka()
  })
}

const PerpanjanganPage = () => {

  const {perpanjangan, tersimpan, disukai} = useLoaderData() as DataLoaderType
  const allData = Promise.all([perpanjangan, tersimpan, disukai])

  return (
    <main className='col-span-9'>
      <PerpanjanganTab />
      <PerpanjanganSearch />

      <AwaitHooks data={allData} loadingComponent={<PeminjamanLoading />}>
        {(data) => <PerpanjanganDataLayout data={data[0].data} savedData={data[1].bukuDisimpan} likedData={data[2].bukuDisukai} />}
      </AwaitHooks>
    </main>
  )
}

export default PerpanjanganPage