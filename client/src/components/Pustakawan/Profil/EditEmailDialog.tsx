import { setEmailDialog } from "@/cart/pustakawanProfilePageSlice"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { store } from "@/store"
import { useSelector } from "react-redux"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateEmailPustakawan } from "@/actions/Pustakawan/Profil/pustakawanProfileActions"
import { Loader } from "lucide-react"
import { toast } from "sonner"

const EditEmailDialog = ({profile} : {profile: any}) => {

  const queryClient = useQueryClient()
  const { isEmailDialogOpen } = useSelector((state: any) => state.pustakawanProfilePageSlice)
  const handleOpen = (value: boolean) => {
    store.dispatch(setEmailDialog(value))
  }

  const mutation = useMutation({
    mutationFn: (data: any) => updateEmailPustakawan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pustakawan', 'profil']})
      toast('Berhasil Diperbaharui', {description: 'Email akun anda telah diperbaharui'})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal memperbaharui email, Coba lagi nanti'
      toast('Terjadi kesalahan', {description: errMsg})
      handleOpen(false)
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    
    mutation.mutate(data)
  }

  return (
    <Dialog open={isEmailDialogOpen} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>Perbaharui Email</DialogTitle>
            <DialogDescription>
             Ganti alamat email Anda dengan yang terbaru agar tetap terhubung dengan semua informasi penting.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="emailLama">Email Lama</Label>
              <Input required type="email" id="emailLama" name="emailLama" defaultValue={profile.email} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="emailBaru">Email Baru</Label>
              <Input required type="email" id="emailBaru" name="emailBaru" autoFocus />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button disabled={mutation.isPending} size='sm' className="text-xs" variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending} size='sm' className="text-xs text-white flex items-center gap-x-2">
              {mutation.isPending ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <p>Memperbaharui....</p>
                </>
              ) : 'Perbaharui'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditEmailDialog