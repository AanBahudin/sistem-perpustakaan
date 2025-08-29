import { updatePasswordPustakawan } from "@/actions/Pustakawan/pustakawanProfileActions"
import { setPasswordDialog, setShoNewPassword, setShowOldPassword } from "@/cart/pustakawanProfilePageSlice"
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
import { useMutation } from "@tanstack/react-query"
import { Eye, Loader } from "lucide-react"
import { useSelector } from "react-redux"
import { toast } from "sonner"

const EditPasswordDialog = () => {

  const { isPasswordDialogOpen, showNewPassword, showOldPassword } = useSelector((state: any) => state.pustakawanProfilePageSlice)
  const handleOpen = (value: boolean) => {
    store.dispatch(setPasswordDialog(value))
  }

  const handlePassword = (type: string) => {
    if (type === 'new') {
      store.dispatch(setShoNewPassword())
    } else {
      store.dispatch(setShowOldPassword())
    }
  }

  const mutation = useMutation({
    mutationFn: (data: any) => updatePasswordPustakawan(data),
    onSuccess: () => {
      toast('Berhasil Diperbaharui', {description: 'Kata sandi akun anda telah diperbaharui'})
      handleOpen(false)
    },
    onError: (error: any) => {
      console.log(error)
      toast('Terjadi kesalahan', {description: 'Gagal memperbaharui passsword, Coba lagi nanti'})
      handleOpen(false)
    }
  })


  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    mutation.mutate(data)
    console.log(data)
  }

  return (
    <Dialog open={isPasswordDialogOpen} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="relative">

          <DialogHeader className="mb-4">
            <DialogTitle>Ubah Password</DialogTitle>
            <DialogDescription>
              Untuk menjaga keamanan akun, silakan perbarui kata sandi Anda dengan yang baru dan mudah diingat.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="passwordLama">Kata sandi lama</Label>
              <div className="flex gap-x-2">
                <Input required type={showOldPassword ? 'text' : 'password'} id="passwordLama" name="passwordLama" />
                <Button onClick={() => handlePassword('old')} variant={showOldPassword ? 'default' : 'ghost'} size='icon'> <Eye /> </Button>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="passwordBaru">Kata sandi baru</Label>
              <div className="flex gap-x-2">
                <Input required type={showNewPassword ? 'text' : 'password'} id="passwordBaru" name="passwordBaru" />
                <Button onClick={() => handlePassword('new')} variant={showNewPassword ? 'default' : 'ghost'} size='icon'> <Eye /> </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="submit" disabled={mutation.isPending} size='sm' className="text-xs" variant="outline">Batal</Button>
            </DialogClose>
            <Button disabled={mutation.isPending} size='sm' className="text-xs text-white flex items-center gap-x-2" type="submit">
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

export default EditPasswordDialog