import { Button } from '@/components/ui/button'
import { BookOpenCheck, Layers, Library, UserRoundPen } from 'lucide-react'
import { Link } from 'react-router-dom'

const LastAdded = ({buku} : {buku:any}) => {
    
    const book = buku.lastAdded

    return (
        <section className='w-full'>
            <h1 className='font-semibold text-xl'>Buku Terbaru</h1>

            <main className='w-full flex items-center justify-center gap-x-10 mt-6 px-6'>
                <img className='w-[300px] h-[350px] rounded-xl' src={book.cover} alt="" />

                <div className='self-start'>
                    <h1 className='text-3xl font-semibold text-left'>{book.judul}</h1>
                    <p className='text-lg text-muted-foreground my-2'>Patterns for Effective Interaction Design</p>

                    <div className='flex gap-x-4'>
                        {book.kategori.map((item:string, index:number) => {
                            return (
                                <p key={index} className='text-white px-4 rounded py-1 bg-primary dark:bg-muted border text-center w-fit'>{item}</p>
                            )
                        })}
                    </div>

                    <p className='mt-4 text-muted-foreground'>{book.deskripsi.slice(0,500)}...</p>

                    <div className='mt-4 flex items-start justify-start gap-x-20'>
                        <span className='flex gap-x-2 items-center text-muted-foreground'>
                            <UserRoundPen className='w-6 h-6 stroke-muted-foreground' />
                            <p>{book.penulis}</p>
                        </span>

                        <span className='flex gap-x-2 items-center text-muted-foreground'>
                            <BookOpenCheck className={`w-6 h-6 ${book.status === 'Tersedia' ? 'stroke-muted-foreground' : 'stroke-destructive'}`} />
                            <p>{book.status}</p>
                        </span>

                        <span className='flex gap-x-2 items-center text-muted-foreground'>
                            <Layers className='w-6 h-6 stroke-muted-foreground' />
                            <p>{book.jumlahHalaman} Halaman</p>
                        </span>

                        <span className='flex gap-x-2 items-center text-muted-foreground'>
                            <Library className='w-6 h-6 stroke-muted-foreground' />
                            <p>{book.stok} Buku</p>
                        </span>
                    </div>

                    <Button asChild className='self-end mt-10 text-white w-full'>
                        <Link to='/' className='self-end text-sm'>Mulai Baca</Link>
                    </Button>
                </div>
            </main>
        </section>
  )
}

export default LastAdded