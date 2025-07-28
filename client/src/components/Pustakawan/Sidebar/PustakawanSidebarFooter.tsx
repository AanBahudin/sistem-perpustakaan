import { LogOut } from "lucide-react"

const PustakawanSidebarFooter = () => {
  return (
    <section className='w-full flex items-center gap-x-4 py-3 px-2 rounded border'>
        <LogOut className={`w-4 h-4 'stroke-white'`} />
        <p className={`text-sm text-muted-foreground`}>Log out</p>
    </section>
  )
}

export default PustakawanSidebarFooter