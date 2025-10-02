import { useSelector } from "react-redux"
import { store } from "@/store"
import { setUserList } from "@/cart/pustakawanSidebar"

const PustakawanUserDataTabs = () => {

    const items = ['mahasiswa', 'dosen', 'terbaru']
    const {userListTabs} = useSelector((state: any)  => state.pustakawanSidebarState)

    return (
        <section className='w-full grid grid-cols-3 text-center text-xs mt-8 mb-4'>
            {items.map((item: string, index: number) => {
                return (    
                    <h1 onClick={() => store.dispatch(setUserList(item))} key={index} className={`${item === userListTabs ? 'border-b' : ' hover:rounded hover:bg-muted-foreground/10' } py-2 cursor-default duraticn-200 ease-in-out capitalize`}>{item}</h1>
                )
            })}
        </section>
  )
}

export default PustakawanUserDataTabs