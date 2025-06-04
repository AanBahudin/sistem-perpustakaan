import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { formatedDate } from '@/utils/formatDate'

const LastBorrowBook = ({peminjaman} : {peminjaman:any}) => {

  let data = peminjaman[0]
  const {buku} = data
  const newDeskripsi : string = buku.deskripsi.slice(0, 180) + '....'
  const kategori: Array<string> = buku.kategori

  return (
    <main className='w-full mt-4 lg:mt-8'>
        <div className="w-full h-[250px] flex gap-x-4">
        <img className="w-32 lg:w-40 h-fit self-center object-cover rounded-xl" src={buku.cover} alt="" />

        <main className='flex flex-col'>
            <h1 className="font-semibold text-2xl">{buku.judul}</h1>
            <p className='font-semibold uppercase text-muted-foreground text-[12px]'>ISBN {buku.ISBN || '-'}</p>
            <div className='w-full flex items-center justify-start gap-x-2'>
              {kategori.slice(0, 2).map((item: string, index: number) => {
                return (
                  <h4 key={index} className="text-sm bg-muted text-center py-1 px-4 rounded w-fit my-2">{item}</h4>
                )
              })}
            </div>
            <p className="text-[12px] lg:text-sm text-muted-foreground mt-2">{newDeskripsi}</p>

            <div className="flex gap-x-4 items-center justify-start">
            <Calendar className="stroke-muted-foreground w-5 h-5" />
            <p className="text-muted-foreground text-sm my-2 lg:my-4">{formatedDate(data.createdAt)} - {formatedDate(data.berakhirPada) || '-'}</p>
            </div>

            <Button asChild size='sm' className="text-sm bg-primary-foreground">
            <Link to="/pengembalian" className="text-sm self-end text-white w-full">Detail</Link>
            </Button>
        </main>
        </div>
    </main>
  )
}

export default LastBorrowBook