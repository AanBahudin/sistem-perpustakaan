import { getPerpanjangan } from '@/actions/perpanjanganActions'
import PeminjamanLoading from '@/components/pengguna/peminjamanPengguna/PeminjamanLoading'
import PerpanjanganDataLayout from '@/components/pengguna/PerpanjanganPengguna.tsx/PerpanjanganDataLayout'
import PerpanjanganSearch from '@/components/pengguna/PerpanjanganPengguna.tsx/PerpanjanganSearch'
import PerpanjanganTab from '@/components/pengguna/PerpanjanganPengguna.tsx/PerpanjanganTab'
import AwaitHooks from '@/hooks/AwaitHooks'
import { defer, useLoaderData } from 'react-router-dom'

export const perpanjanganLoader = async({request} : {request: Request}) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams.toString()

  return defer({
    perpanjangan: getPerpanjangan(searchParams)
  })
}

const PerpanjanganPage = () => {

  const {perpanjangan} = useLoaderData() as {perpanjangan: Promise<any>}

  return (
    <main className='col-span-9'>
      <PerpanjanganTab />
      <PerpanjanganSearch />

      <AwaitHooks data={perpanjangan} loadingComponent={<PeminjamanLoading />}>
        {(data) => <PerpanjanganDataLayout data={data.data} />}
      </AwaitHooks>
    </main>
  )
}

export default PerpanjanganPage