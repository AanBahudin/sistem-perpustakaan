import { setPustakawanDetailBukuTabs } from '@/cart/detailBookSlice'
import { Button } from '@/components/ui/button'
import { store } from '@/store'
import { useSelector } from 'react-redux'

const DetailBukuTabs = () => {

    const { pustakawanDetailBukuTabs: isActive } = useSelector((state: any) => state.detailBukuState)
    const handleTabsValue = (value: string) => {
        store.dispatch(setPustakawanDetailBukuTabs(value))
    }
    const menus: Array<string> = ['Umum', 'Peminjaman', 'Riwayat Pengembalian', 'Riwayat Hilang']

    return (
        <section className='w-full flex items-center justify-start gap-x-4'>
            {menus.map((item: string, index: number) => {
                const activeMenu: boolean = item === isActive
                return (
                    <Button onClick={() => handleTabsValue(item)} className={`dark:text-white text-muted-foreground duration-200 ease-in-out text-xs min-w-[150px] border ${activeMenu ? 'dark:bg-primary/40 dark:hover:bg-primary/40 bg-primary/80 text-white' : 'bg-transparent  hover:bg-accent'}`} key={index}>{item}</Button>
                )
            })}
        </section>
    )
}

export default DetailBukuTabs