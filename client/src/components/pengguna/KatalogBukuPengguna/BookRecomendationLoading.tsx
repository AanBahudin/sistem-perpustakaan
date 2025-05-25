import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const BookRecomendationLoading = () => {
  return (
    <section className='flex gap-x-8 my-8'>
        {Array.from({length: 5}).map((_, index) => {
            return (
                <Skeleton key={index} className='bg-muted h-[300px] w-[230px] rounded-xl' />
            )
        })}
    </section>
  )
}

export default BookRecomendationLoading