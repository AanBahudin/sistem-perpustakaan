import { Skeleton } from "@/components/ui/skeleton"

const AllBookLoading = () => {
  return (
    <section className='w-full grid grid-cols-12 gap-6 my-10'>
        {Array.from({length: 12}).map((_, index: number) => {
            return (
                <Skeleton key={index} className="col-span-4 p-4 h-32 border" />
            )
        })}
    </section>
  )
}

export default AllBookLoading