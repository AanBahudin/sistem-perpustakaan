import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useUpdateMaksimalPeminjamanPengguna from '@/hooks/fetchHooks/pustakawanHooks/pengaturanHooks/useUpdateMaksimalPeminjamanPengguna'


const PengaturanMaksimalPeminjamanDialog = ({children, dataMaks} : {children: React.ReactNode, dataMaks: any}) => {

    const { isLoading, openDialog, handleOpenFn, mutationFn } = useUpdateMaksimalPeminjamanPengguna({id: dataMaks._id})

    return (
        <Dialog open={openDialog} onOpenChange={handleOpenFn}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={mutationFn}>
                    <DialogHeader className='mb-4'>
                        <DialogTitle>Ubah Maksimal Peminjaman</DialogTitle>
                        <DialogDescription className='text-xs text-muted-foreground'>Perbarui maksimal peminjaman sesuai kebijakan terbaru. Pastikan nilai yang dimasukkan sudah benar.</DialogDescription>
                    </DialogHeader>
        
                    <section className="flex flex-col w-full gap-y-4">
                        <main className='flex-1 flex flex-col gap-y-2'>
                            <Label htmlFor='denda' className='text-sm'>Maksimal Peminjaman</Label>
                            <div className='flex items-center gap-x-2 flex-row'>
                                <Input 
                                    required autoFocus
                                    type='number' min={1}
                                    defaultValue={dataMaks.maksimal}
                                    name='maksimal' placeholder='Total hari peminjaman'
                                    className='text-muted-foreground !text-xs' />
                                <p className='w-[90px] text-center h-9 text-sm font-semibold flex items-center justify-center bg-primary/20 cursor-default border rounded-lg !placeholder:text-xs'>Hari</p>
                            </div>
                        </main>
                    </section>
        
                    <DialogFooter className='mt-4'>
                        <DialogClose asChild>
                            <Button disabled={isLoading} size='sm' variant="outline">Batal</Button>
                        </DialogClose>

                        <Button disabled={isLoading} size='sm' type="submit" className='flex items-center gap-x-2'>
                            {isLoading && <Loader className='animate-spin' />}
                            {isLoading ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default PengaturanMaksimalPeminjamanDialog