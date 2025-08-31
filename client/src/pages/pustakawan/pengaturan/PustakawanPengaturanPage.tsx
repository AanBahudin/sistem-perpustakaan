import { getDurasi } from '@/actions/durasiActions'
import { getDenda } from '@/actions/GlobalActions/DendaActions'
import { getAllKategori } from '@/actions/kategoriAction'
import PustakawanBreadCrumbs from '@/components/Pustakawan/PustakawanBreadCrumbs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Container from '@/globals/Container'
import { Label } from '@/components/ui/label'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit, Loader, PlusCircle, Trash } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { formatRupiah } from '@/utils/formatCurrency'
import { getAllKondisi, psutakawanEditKondisi, pustakawanHapusKondisi, pustakawanTambahKondisi } from '@/actions/Pustakawan/pustakawanKondisiActionts'

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
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useState } from 'react'

const PustakawanPengaturanPage = () => {

  const [searchParams] = useSearchParams()
  const currentParams = searchParams.get('menu') || 'Kondisi Buku'

  return (
    <Container className='w-full'>
      <PustakawanBreadCrumbs />
      <PustakawanPengaturanTabsMenu />
      {(currentParams === 'Kondisi Buku' || !currentParams) && <PustakawanKondisiBukuSection />}
      {currentParams === 'Denda' && <PustakawanDendaSection />}
      {currentParams === 'Kategori' && <PustakawanKategoriSection />}
      {currentParams === 'Durasi' && <PustakawanDurasiSection />}
    </Container>
  )
}

const PustakawanPengaturanTabsMenu = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentParams = searchParams.get('menu') || 'Kondisi Buku'
  const fullParams = new URLSearchParams(searchParams)
  const values: Array<string> = ['Kondisi Buku', 'Denda', 'Kategori', 'Durasi']

  const handleClick = (value: string) => {
    if (value === 'Kondisi Buku') {
      fullParams.delete('menu')
    } else {
      fullParams.set('menu', value)
    }

    navigate(`?${fullParams.toString()}`)
  }

  return (
    <section className='w-full flex items-center justify-start gap-x-4 my-4'>
      {values.map((item: string, index: number) => {
        const isActiveMenu = currentParams === item
        return (
          <main onClick={() => handleClick(item)} key={index} className={`${isActiveMenu ? 'bg-primary/80  text-white' : 'bg-transparent hover:bg-muted'} min-w-[150px] text-xs cursor-default duration-200 ease-in-out text-muted-foreground px-2 rounded-lg py-2 border text-center`}>
            <p>{item}</p>
          </main>
        )
      })}
    </section>
  )
}

const PustakawanKondisiBukuSection = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['kondisi'],
    queryFn: getAllKondisi
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full my-6 min-h-[80vh]'>
      <section className='w-full flex items-center justify-between mt-10'>
        <h1 className='text-3xl font-bold'>Klasifikasi Kondisi Buku</h1>
        <PengaturanTambahKondisiDialog>
          <Button className='text-xs flex items-center gap-x-2 hover:bg-primary/40 ease-in-out duration-200'>
            <PlusCircle />
            <p>Kondisi</p>
          </Button>
        </PengaturanTambahKondisiDialog>
      </section>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Setiap buku memiliki penilaian kondisi fisik untuk menentukan kelayakan dan perhitungan denda. Klasifikasi ini membantu pustakawan dan pengguna memahami standar pemeliharaan koleksi. Kondisi biasanya mencakup kategori seperti Baik, Rusak Ringan, Rusak Berat, hingga Hilang.</h5>

      <section className='w-full flex flex-col items-center my-2'>
        {data.map((item: any, index: number) => {
          return (
            <main key={index} className='w-full flex-1 py-4 border-b flex items-center justify-between'>
              <div>
                <h4 className='text-sm font-semibold text-white'>{item.kondisi}</h4>
                <p className='text-sm text-muted-foreground '>{formatRupiah(item.denda)}</p>
                <p className='text-xs my-2 text-muted-foreground'>{item.deskripsi}</p>
              </div>

              <div className='w-fit flex items-center gap-x-4'> 
                <PengaturanKondisiBukuDialog dataKondisi={item}>
                  <Button className='hover:bg-primary/30 duration-200 ease-in-out' size='icon'><Edit /></Button>
                </PengaturanKondisiBukuDialog>

                <PengaturanKondisiBukuAlert idKondisi={item._id}>
                  <Button size='icon' variant='destructive' className='hover:bg-destructive/30 duration-200 ease-in-out'><Trash /></Button>  
                </PengaturanKondisiBukuAlert>
              </div>
            </main>
          )
        })}

      </section>
    </Container>
  )
}

const PustakawanDendaSection = () => {

  const {data, isLoading} = useQuery({
    queryKey: ['denda'],
    queryFn: getDenda
  })

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Container className='w-full my-6 min-h-[80vh]'>
      <h1 className='text-3xl font-bold mt-10'>Ketentuan Denda Peminjaman Buku</h1>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Denda diberlakukan sebagai bentuk tanggung jawab pengguna dalam menjaga koleksi perpustakaan. Besaran denda ditentukan berdasarkan keterlambatan pengembalian. Pastikan buku dikembalikan tepat waktu dan dalam keadaan baik untuk menghindari biaya tambahan.</h5>

      <section className='w-full flex items-center justify-between my-10'>
        <Label className='capitalize text-md text-muted-foreground'>Nominal denda keterlambatan</Label>
        <main className='w-fit flex items-center justify-center gap-x-4'>
          <Input type='text' defaultValue={formatRupiah(data)} readOnly />
          <Button size='sm'><Edit /></Button>
        </main>
      </section>
    </Container>
  )
}

const PustakawanKategoriSection = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['kategori'],
    queryFn: getAllKategori
  })

  if (isLoading) return <h1>Loading....</h1>


  const groupedCategories = data.data.reduce((acc: any, kategori: any) => {
    const firstLetter = kategori.nama.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(kategori.nama)
    return acc
  }, {})

  
  return (
    <Container className='w-full my-6 min-h-[80vh'>
      <h1 className='text-3xl font-bold mt-10'>Daftar Kategori Koleksi Perpustakaan</h1>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Semua koleksi buku di perpustakaan dikelompokkan berdasarkan kategori untuk memudahkan pencarian. Setiap kategori diurutkan menurut huruf abjad, sehingga pengguna dapat dengan cepat menemukan bidang ilmu atau topik yang dibutuhkan.</h5>

      <section className='w-full flex flex-col gap-y-4 my-8 '>
        {Object.keys(groupedCategories).sort().map((letter: any, index: number) => {
          const kategoriesArray = groupedCategories[letter]
          return (
            <div key={index} className='w-full min-h-[15vh]'>
              <main className='w-full flex items-center gap-x-8'>
                <h4 className='text-3xl text-muted-foreground font-semibold'>{letter}</h4>
                <Separator className='flex-1' />
              </main>
      
              <main className='w-full flex items-center justify-start flex-wrap gap-4 mt-4'>
                {kategoriesArray.map((item: string, index: number) => {
                  return (
                    <Badge key={index} className='text-xs text-white cursor-default bg-primary hover:bg-primary/30 duration-200 ease-in-out'>{item}</Badge>
                  )
                })}
              </main>
            </div>
          )
        })}
      </section>
    </Container>
  )
}

const PustakawanDurasiSection = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['durasi'],
    queryFn: getDurasi
  })

  if (isLoading) return <h1>Loading....</h1>

  return (
    <Container className='w-full my-6 min-h-[80vh]'>
      <h1 className='text-3xl font-bold mt-10'>Durasi Peminjaman Buku</h1>
      <h5 className='mt-3 text-sm text-muted-foreground w-[80%]'>Setiap pengguna memiliki batas waktu tertentu dalam meminjam buku. Durasi ini ditetapkan agar semua anggota perpustakaan mendapatkan kesempatan yang sama untuk mengakses koleksi. Apabila melebihi batas waktu, maka akan dikenakan denda sesuai ketentuan yang berlaku.</h5>

      <section className='w-full flex flex-col items-center my-2'>
        {data.map((item: any, index: number) => {
          return (
            <main key={index} className='w-full flex-1 p-4 border-b flex items-center justify-between'>
              <h4 className='text-sm text-muted-foreground'>{item.durasi} Hari Peminjaman</h4>

              <div className='w-fit flex items-center gap-x-4'>
                <Button size='icon'><Edit /></Button>
                <Button size='icon' variant='destructive'><Trash /></Button>
              </div>
            </main>
          )
        })}

      </section>
    </Container>
  )
}


// DIALOG TAMBAH KONDISI
const PengaturanTambahKondisiDialog = ({children} : {children: React.ReactNode}) => {

  const [openDialog, setOpenDialog] = useState(false)
  const [deskripsiLength, setDeskripsi] = useState('')
  const [denda, setDenda] = useState('')

  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }

  const handleDeskripsi = (value: string) => {
    if (deskripsiLength.length <= 100) {
      setDeskripsi(value)
    }
  }

  const handleDenda = (value: string) => {
    let onlyNumbers = value.replace(/\D/g, "")
    if (onlyNumbers.startsWith("0")) {
      onlyNumbers = onlyNumbers.replace(/^0+/, "")
    }

    if (!onlyNumbers) return ""

    // Tambahkan pemisah ribuan
    const finalDendaFormat = new Intl.NumberFormat("id-ID").format(parseInt(onlyNumbers, 10))
    setDenda(finalDendaFormat)
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
     mutationFn: (data: any) => pustakawanTambahKondisi(data),
     onSuccess: () => {
      toast('Kondisi Berhasil Ditambahkan!')
      queryClient.invalidateQueries({queryKey: ['kondisi']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal menambahkan kondisi, Coba lagi nanti'
      toast('Terjadi kesalahan', {description: errMsg})
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    mutation.mutate(data)
  }
  
  return (
    <Dialog open={openDialog} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-4'>
            <DialogTitle>Ubah Kondisi Buku?</DialogTitle>
            <DialogDescription className='text-xs text-muted-foreground'>Tambah informasi kondisi buku sesuai keadaan terkini. Pastikan data yang diubah sudah benar agar pencatatan koleksi tetap akurat.</DialogDescription>
          </DialogHeader>

          <section className="flex flex-col w-full gap-y-4">
            <main className='w-full flex items-center gap-x-4'>
              <div className='flex-1 flex flex-col gap-y-2'>
                <Label htmlFor='kondisi' className='!text-sm'>Kondisi Buku</Label>
                <Input 
                  required autoFocus
                  name='kondisi' placeholder='Kondisi'
                  className='text-muted-foreground !text-xs' />
              </div>

              <div className='flex-1 flex flex-col gap-y-2'>
                <Label htmlFor='denda' className='!text-sm'>Nominal Denda</Label>
                <section className="w-full flex items-center gap-x-2">
                  <p className='flex border h-full py-2 px-2.5 rounded-lg bg-primary items-center justify-center !text-xs'>Rp</p>
                  <Input 
                    required 
                    type='text' inputMode='numeric'
                    value={denda} onChange={(e) => handleDenda(e.target.value)}
                    name='denda' placeholder='Nominal denda yang harus dibayar'
                    className='text-muted-foreground !text-xs' />
                </section>
              </div>              
            </main>

            <main className='w-full flex-col flex gap-y-2'>
              <div className='w-full flex items-center justify-between'>
                <Label htmlFor='deskripsi' className='!text-sm'>Deskripsi</Label>
                <p className='text-muted-foreground text-xs'>{deskripsiLength.length} / 100</p>
              </div>
              <Textarea
                required maxLength={100} cols={30}
                value={deskripsiLength} onChange={(e) => handleDeskripsi(e.target.value)}
                name='deskripsi' placeholder='Penjelasan deskripsi sesuai dengan kondisi buku'
                className='max-w-full !text-xs text-muted-foreground resize-none whitespace-pre-wrap break-words' />
            </main>
          </section>

          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button disabled={mutation.isPending} size='sm' variant="outline">Batal</Button>
            </DialogClose>
            <Button disabled={mutation.isPending} size='sm' type="submit" className='flex items-center gap-x-2'>
              {mutation.isPending && <Loader className='animate-spin' />}
              {mutation.isPending ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// DIALOG DAN ALERT KONDISI BUKU
const PengaturanKondisiBukuDialog = ({children, dataKondisi} : {children: React.ReactNode, dataKondisi: any}) => {
  const { kondisi, denda, deskripsi, _id: idKondisi } = dataKondisi
  const formatedDenda = new Intl.NumberFormat("id-ID").format(parseInt(denda, 10))

  const [openDialog, setOpenDialog] = useState(false)
  const [deskripsiLength, setDeskripsi] = useState(deskripsi)
  const [dendaValue, setDenda] = useState(formatedDenda)
  
  const handleOpen = (value: boolean) => {
    if (!value) {
      setDeskripsi(deskripsi)
    }
    setOpenDialog(value)
  }

  const handleDeskripsi = (value: string) => {
    if (deskripsiLength.length <= 100) {
      setDeskripsi(value)
    }
  }

  const handleDenda = (value: string) => {
    let onlyNumbers = value.replace(/\D/g, "")
    if (onlyNumbers.startsWith("0")) {
      onlyNumbers = onlyNumbers.replace(/^0+/, "")
    }

    if (!onlyNumbers) return ""

    // Tambahkan pemisah ribuan
    const finalDendaFormat = new Intl.NumberFormat("id-ID").format(parseInt(onlyNumbers, 10))
    setDenda(finalDendaFormat)
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
     mutationFn: (data: any) => psutakawanEditKondisi(data, idKondisi),
     onSuccess: () => {
      toast('Kondisi Berhasil Diperbaharui!')
      queryClient.invalidateQueries({queryKey: ['kondisi']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal memperbaharui kondisi, Coba lagi nanti'
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
    <Dialog open={openDialog} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className='mb-4'>
            <DialogTitle>Ubah Kondisi Buku?</DialogTitle>
            <DialogDescription className='text-xs text-muted-foreground'>Perbarui informasi kondisi buku sesuai keadaan terkini. Pastikan data yang diubah sudah benar agar pencatatan koleksi tetap akurat.</DialogDescription>
          </DialogHeader>

          <section className="flex flex-col w-full gap-y-4">
            <main className='w-full flex items-center gap-x-4'>
              <div className='flex-1 flex flex-col gap-y-2'>
                <Label htmlFor='kondisi' className='text-sm'>Kondisi Buku</Label>
                <Input required defaultValue={kondisi} name='kondisi' autoFocus className='text-muted-foreground !text-xs' />
              </div>

              <div className='flex-1 flex flex-col gap-y-2'>
                <Label htmlFor='denda' className='text-sm'>Nominal Denda</Label>
                <section className="w-full flex items-center gap-x-2">
                  <p className='flex border h-full py-2 px-2.5 rounded-lg bg-primary items-center justify-center !text-xs'>Rp</p>
                  <Input 
                    required 
                    type='text' inputMode='numeric'
                    value={dendaValue} onChange={(e) => handleDenda(e.target.value)}
                    name='denda'
                    className='text-muted-foreground !text-xs' />
                </section>
              </div>              
            </main>

            <main className='w-full flex-col flex gap-y-2'>
              <div className='w-full flex items-center justify-between'>
                <Label htmlFor='deskripsi'>Deskripsi</Label>
                <p className='text-muted-foreground text-xs'>{deskripsiLength.length} / 100</p>
              </div>
              <Textarea 
                maxLength={100} cols={30} required name='deskripsi' 
                className='!text-xs text-muted-foreground min-h-[15vh]'
                value={deskripsiLength} onChange={(e) => handleDeskripsi(e.target.value)} defaultValue={deskripsi} />
            </main>
          </section>

          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button disabled={mutation.isPending} size='sm' variant="outline">Batal</Button>
            </DialogClose>
            <Button disabled={mutation.isPending} size='sm' type="submit" className='flex items-center gap-x-2'>
              {mutation.isPending && <Loader className='animate-spin' />}
              {mutation.isPending ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const PengaturanKondisiBukuAlert = ({children, idKondisi} : {children: React.ReactNode, idKondisi: string}) => {

  const [openDialog, setOpenDialog] = useState(false)
  const handleOpen = (value: boolean) => {
    setOpenDialog(value)
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => pustakawanHapusKondisi(idKondisi),
    onSuccess: () => {
      toast('Kondisi Berhasil Diperbaharui!')
      queryClient.invalidateQueries({queryKey: ['kondisi']})
      handleOpen(false)
    },
    onError: (error: any) => {
      const errMsg = error.response.data.message || 'Gagal memperbaharui kondisi, Coba lagi nanti'
      toast('Terjadi kesalahan', {description: errMsg})
      handleOpen(false)
    }
  })

  const handleClick = async() => {
    mutation.mutate()
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={handleOpen} defaultOpen={openDialog}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Anda yakin menghapus kondisi ini?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dipulihkan, Dengan menekan <strong>Hapus</strong>, kondisi akan terhapus secara permanen
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel  disabled={mutation.isPending}>Batal</AlertDialogCancel>
          <Button disabled={mutation.isPending} variant='destructive' type='submit' onClick={handleClick} className='flex items-center gap-x-2'>
            {mutation.isPending && <Loader className='animate-spin' />}
            {mutation.isPending ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 

export default PustakawanPengaturanPage