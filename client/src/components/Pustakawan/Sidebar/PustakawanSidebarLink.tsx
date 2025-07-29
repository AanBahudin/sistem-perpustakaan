import { pustakanSidebarMenu } from "@/utils/pustakawanSidebarMenu"
import PustakawanNavlinkItem from "./PustakawanNavlinkItem"

const PustakawanSidebarLink = () => {
  return (
    <main className='w-full overflow-y-auto scroll-custom h-full flex-1 flex flex-col items-start gap-y-1 mt-16'>
      {pustakanSidebarMenu.map((item: any, index: number) => {
        return (
          <PustakawanNavlinkItem data={item} key={index} />
        )
      })}
    </main>
  )
}

export default PustakawanSidebarLink