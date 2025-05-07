import { kategori } from '@/utils/constants'

const KategorySection = () => {
  return (
    <section className='w-full flex gap-x-3 items-center justify-center my-20'>
        {kategori.map((item, index) => {
            return (
                <div key={index} className='w-1/6 p-4 rounded-xl border'>
                    <main className='bg-primary-foreground w-fit p-2 rounded'>
                        {item.icon}
                    </main>
                    <h3 className='font-semibold  my-2'>{item.title}</h3>
                    <p className='text-sm text-muted-foreground'>Lorem ipsum dolor, sit amet consectetur</p>
                </div>
            )
        })}
    </section>
  )
}

export default KategorySection