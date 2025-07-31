import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import PustakawanUserDataTabs from './PustakawanUserDataTabs'

const PustakawanUserDataContainer = () => {

    return (
        <section className='w-full bg-accent/40 border my-8 rounded-2xl h-[60vh] px-4 pt-8 pb-4 flex flex-col items-start'>
            <main className='w-full flex items-center justify-between'>
                <h1 className='text-lg'>Ringkasan Daftar Pengguna</h1>
                <Link to='/pustakawan/pengguna' className='text-xs hover:underline duration-200 ease-in-out cursor-default'>Lihat semua</Link>
            </main>

        
            <PustakawanUserDataTabs />

            <main className='w-full flex flex-1 overflow-y-scroll scroll-custom flex-col items-start gap-y-4'>
                {Array.from({length: 6}).map((_, index: number) => {
                    return <UserCard key={index} />
                })}
            </main>
        </section>
  )
}

export default PustakawanUserDataContainer