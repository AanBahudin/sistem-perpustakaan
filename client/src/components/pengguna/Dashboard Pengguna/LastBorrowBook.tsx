import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const LastBorrowBook = () => {
  return (
    <main className='w-full mt-4 lg:mt-8'>
        <div className="w-full h-[250px] flex gap-x-4">
        <img className="w-32 lg:w-40 h-fit self-center object-cover rounded" src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746458439/eeerieu4ivgzsylylaaj.jpg" alt="" />

        <main className='flex flex-col'>
            <h1 className="font-semibold text-2xl">Clean Code</h1>
            <h4 className="text-sm bg-muted text-center py-1 px-4 rounded w-fit mt-2 mb-4">Teknologi Informasi</h4>
            <p className="text-[12px] lg:text-sm text-muted-foreground mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quibusdam? Provident iste saepe ipsam odio dignissimos aliquam ducimus blanditiis ad?</p>

            <div className="flex gap-x-4 items-center justify-start">
            <Calendar className="stroke-muted-foreground w-5 h-5" />
            <p className="text-muted-foreground text-sm my-2 lg:my-4">16 Mei 2024 - 30 Juli 2024</p>
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