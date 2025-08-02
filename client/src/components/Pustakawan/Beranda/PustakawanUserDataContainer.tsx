import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'
import PustakawanUserDataTabs from './PustakawanUserDataTabs'

const PustakawanUserDataContainer = ({data} : {data: any}) => {

    const {pengguna} = data
    const {userListTabs} = useSelector((state: any)  => state.pustakawanSidebarState)


    return (
        <section className='w-full bg-accent/40 border my-8 rounded-2xl h-[60vh] px-4 pt-8 pb-4 flex flex-col items-start'>
            <main className='w-full flex items-center justify-between'>
                <h1 className='text-lg'>Ringkasan Daftar Pengguna</h1>
                <Link to='/pustakawan/pengguna' className='text-xs hover:underline duration-200 ease-in-out cursor-default'>Lihat semua</Link>
            </main>

        
            <PustakawanUserDataTabs />

            <main className='w-full flex flex-1 overflow-y-scroll scroll-custom flex-col items-start gap-y-4'>
                {pengguna.filter((user: any) => {
                    const userRole : string = user.role
                    if (userListTabs !== 'terbaru') {
                        return userRole.toLowerCase() === userListTabs
                    }
                    return user
                }).map((user: any, index: number) => {
                    return <UserCard key={index} user={user} />
                })}
            </main>
        </section>
  )
}

export default PustakawanUserDataContainer