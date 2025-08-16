import { Alert } from "@/components/ui/alert"
import GlobalTooltip from "@/globals/GlobalTooltip"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"


const PeminjamanApprovalContainer = ({peminjaman} : {peminjaman: any}) => {

    const { peminjam } = peminjaman

    return (
        <Alert className='w-full flex items-center justify-between my-6'>
            <h1 className='text-sm font-light'>
                <span className='text-primary font-bold underline'>{peminjam.nama}</span> mengajukan peminjaman, Terima pengajuan?
            </h1>

            <main className='flex items-center gap-x-4'>
                <GlobalTooltip text='Tolak pengajuan'>
                    <Button size='icon' className='bg-destructive hover:bg-destructive/50 ease-in-out duration-200 text-center text-xs text-white'><X /></Button>
                </GlobalTooltip>

                <GlobalTooltip text='Terima Pengajuan'>
                    <Button className='text-center text-white hover:bg-primary/50 ease-in-out duration-200'><Check /></Button>
                </GlobalTooltip>
            </main>
        </Alert>
    )
}

export default PeminjamanApprovalContainer