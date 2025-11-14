import { Skeleton } from "@/components/ui/skeleton"

const LandingKatalogLoading = () => {
  return (
    <section className='w-full min-h-[40vh] my-10'>
      <main className='w-full grid grid-cols-12 gap-6'>
        {Array.from({length: 18}).map((_, index: number) => {
          return (
            <Skeleton key={index} className='col-span-4 h-[160px] p-2 rounded-xl border' />
          )
        })}
      </main>
    </section>
  )
}

export default LandingKatalogLoading