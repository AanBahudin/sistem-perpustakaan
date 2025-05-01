import React from 'react'
import { Card } from '@/components/ui/card'
import { layananCardData } from '@/utils/constants'

const LayananCard : React.FC = () => {
  return (
    <section className='grid grid-cols-2 col-span-1 place-items-center-safe gap-4'>
        {layananCardData.map(item => {
        return (
            <Card key={item.id} className='px-4 lg:px-6 py-6 rounded-xl flex items-center justify-center flex-col gap-y-2 lg:gap-y-4 dark:bg-primary-foreground'>
            <div className='w-14 h-14 bg-primary-foreground dark:bg-primary rounded-full flex items-center justify-center'>
                {item.icon}
            </div>
            <h3 className='font-semibold'>{item.title}</h3>
            <p className='text-sm text-muted-foreground text-center'>{item.desc}.</p>
            </Card>
        )
        })}
    </section>
  )
}

export default LayananCard