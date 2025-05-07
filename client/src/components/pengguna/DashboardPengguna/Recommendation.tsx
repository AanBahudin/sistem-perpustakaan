import { Separator } from '@/components/ui/separator'
import { BookCheck, Eye, ThumbsUp } from 'lucide-react'
import React from 'react'

const BookRecommendation = () => {
  return (
    <section className='w-2/4 bg-card rounded-xl border p-6 flex justify-start items-start flex-col'>
        <h3 className='mb-6'>Anda mungkin suka</h3>


        <main className='self-center w-[90%] flex gap-x-6'>
          <img className="h-40 w-28 object-fill rounded" src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746458439/eeerieu4ivgzsylylaaj.jpg" alt="" />

          <div className='flex flex-col'>
              <h2 className='font-semibold text-2xl'>Clean Code  </h2>
              <h5 className='text-sm text-muted-foreground'>{'A Handbook of Agile Software Craftmanship'.slice(0,40)}...</h5>
              <p className='text-sm text-muted-foreground mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod itaque mollitia quam dolorem, ullam architecto!</p>

              <Separator className='mt-4' />
              <div className='w-full flex items-center justify-around text-sm mt-2'>
                <span className='flex gap-x-4 items-center'>
                  <Eye className='w-4 h-4 stroke-muted-foreground' />
                  <p className='text-sm'>230</p>
                </span>
                <Separator orientation='vertical' />
                <span className='flex gap-x-4 items-center'>
                  <BookCheck className='w-4 h-4 stroke-muted-foreground' />
                  <p className='text-sm'>230</p>
                </span>
                <Separator orientation='vertical' />
                <span className='flex gap-x-4 items-center'>
                  <ThumbsUp className='w-4 h-4 stroke-muted-foreground' />
                  <p className='text-sm'>230</p>
                </span>
              </div>
          </div>

        </main>

    </section>
  )
}

export default BookRecommendation