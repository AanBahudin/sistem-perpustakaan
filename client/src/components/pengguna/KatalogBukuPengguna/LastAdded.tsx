import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BookOpenCheck, Layers, Library, UserRoundPen } from 'lucide-react'
import { Link } from 'react-router-dom'

const LastAdded = () => {
  return (
    <section className='w-full'>
        <h1 className='font-semibold text-xl'>Buku Terbaru</h1>

        <main className='w-full flex items-center justify-center gap-x-10 mt-6 px-6'>
            <img className='w-[300px] h-[350px] rounded-xl' src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746591517/vduqbwxwfvxaktiotebg.jpg" alt="" />

            <div className='self-start'>
                <h1 className='text-3xl font-semibold text-left'>Designing Interfaces</h1>
                <p className='text-lg text-muted-foreground my-2'>Patterns for Effective Interaction Design</p>

                <div className='flex gap-x-4'>
                    <p className='text-white px-4 rounded py-1 bg-muted border text-center w-fit'>Design Graphic</p>
                    <p className='text-white px-4 rounded py-1 bg-muted border text-center w-fit'>UI/UX</p>
                </div>

                <p className='mt-4 text-muted-foreground'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores facere voluptates et perferendis odit ut voluptatibus natus reprehenderit possimus a corrupti quas numquam, quibusdam quo deserunt? Asperiores aut, non dolore labore eaque quo deserunt reprehenderit deleniti nihil minima sint commodi aspernatur excepturi perferendis fugit quod saepe veritatis, repudiandae possimus laudantium! Repudiandae necessitatibus reprehenderit eius quibusdam placeat explicabo, ipsa magnam et.</p>

                <div className='mt-4 flex items-start justify-start gap-x-20'>
                    <span className='flex gap-x-2 items-center text-muted-foreground'>
                        <UserRoundPen className='w-6 h-6 stroke-muted-foreground' />
                        <p>Jenifer Tidwell</p>
                    </span>

                    <span className='flex gap-x-2 items-center text-muted-foreground'>
                        <BookOpenCheck className='w-6 h-6 stroke-muted-foreground' />
                        <p>Tersedia</p>
                    </span>

                    <span className='flex gap-x-2 items-center text-muted-foreground'>
                        <Layers className='w-6 h-6 stroke-muted-foreground' />
                        <p>304 Halaman</p>
                    </span>

                    <span className='flex gap-x-2 items-center text-muted-foreground'>
                        <Library className='w-6 h-6 stroke-muted-foreground' />
                        <p>13 Buku</p>
                    </span>
                </div>

                <Button asChild className='self-end mt-10 text-white w-1/3'>
                    <Link to='/' className='self-end text-sm'>Mulai Baca</Link>
                </Button>
            </div>
        </main>
    </section>
  )
}

export default LastAdded