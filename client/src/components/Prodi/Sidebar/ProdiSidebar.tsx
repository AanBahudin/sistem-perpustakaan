import { useSelector } from "react-redux"
import ProdiSidebarHeader from "./ProdiSidebarHeader"
import ProdiSidebarLink from "./ProdiSidebarLink"
import ProdiSidebarFooter from "./ProdiSidebarFooter"


const ProdiSidebar = () => {
    
    const {showSidebar} = useSelector((state: any) => state.pustakawanSidebarState)

    return (
        <section className={`${
            showSidebar ? 'w-[18%] px-4 py-6' : 'w-0 p-0'
        } h-[100vh] flex items-start flex-col overflow-y-auto scroll-custom border-r transition-all duration-500 ease-in-out `}>
            <ProdiSidebarHeader />
            <ProdiSidebarLink />
            <ProdiSidebarFooter />
        </section>
    )
}

export default ProdiSidebar