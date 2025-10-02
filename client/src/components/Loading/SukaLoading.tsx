import { Skeleton } from "../ui/skeleton"

const SukaLoading = () => {
  return (
    <section className='w-full grid grid-cols-12 gap-6 mt-10'>
      {Array.from({length: 3}).map((_, index) => {
        return (
          <main key={index} className='col-span-4 bg-card p-2 flex items-center gap-x-4 rounded-xl border hover:border-primary duration-150 ease-in-out group'>
            <Skeleton className='w-[200px] h-[160px] '/>

            <div className='flex w-full items-start justify-between flex-col gap-y-4'>
              <Skeleton className="w-2/3 h-6" />
              <Skeleton className="w-[200px] h-4" />
              <Skeleton className="w-1/3 h-4" />
              <Skeleton className="w-2/3 h-4" />

              <div className='w-full flex gap-x-2'>
                <Skeleton className="w-2/3 h-4" />
                <Skeleton className="w-1/3 h-4" />
              </div>
            </div>
          </main>
        )
      })}
    </section>
  )
}

export default SukaLoading