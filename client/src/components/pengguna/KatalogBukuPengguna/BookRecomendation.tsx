import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const BookRecomendation = () => {
  return (
    <section className='w-full flex flex-col items-center justify-center'>

        <main className='w-full flex items-center justify-between'>
            <h1 className='font-semibold text-xl'>Rekomendasi Buku</h1>
            <Button asChild className='px-4 text-[12px] text-white' variant='secondary'>
                <Link to='/' className='text-sm'>View All</Link>
            </Button>
        </main>

        <main className='flex gap-x-8 my-8'>
            <img className='bg-muted h-[300px] w-[230px] rounded-xl border object-fill' src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746590828/ybtknqtmtdtjfnhmoarf.jpg" alt="" />
            <img className='bg-muted h-[300px] w-[230px] rounded-xl border object-fill' src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746590828/wnsqnnjsplzphfieu8zm.jpg" alt="" />
            <img className='bg-muted h-[300px] w-[230px] rounded-xl border object-fill' src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746590828/pniobt30gz28siatflgf.jpg" alt="" />
            <img className='bg-muted h-[300px] w-[230px] rounded-xl border object-fill' src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746585631/rljqdfpo7oljsit5zdyq.jpg" alt="" />
            <img className='bg-muted h-[300px] w-[230px] rounded-xl border object-fill' src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746585631/rljqdfpo7oljsit5zdyq.jpg" alt="" />
        </main>
    </section>
  )
}

export default BookRecomendation