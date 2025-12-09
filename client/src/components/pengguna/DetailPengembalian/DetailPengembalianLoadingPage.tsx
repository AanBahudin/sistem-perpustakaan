import { Separator } from '../../ui/separator'
import { Skeleton } from '../../ui/skeleton'

const DetailPengembalianLoadingPage = () => {
  return (
    <section className='w-full'>
      <section className='w-full'>
        <Skeleton className='w-1/3 h-5' />

        <main className="w-full grid grid-cols-12 gap-x-4 mt-10">
          <section className='col-span-8 min-h-[80vh] border rounded-2xl p-6'>
            <section className='w-full flex justify-start gap-x-4'>
              <Skeleton className='w-40 border h-36' />

              <main className='flex w-full flex-col items-start justify-start gap-y-2'>
                <Skeleton className='w-1/6 h-4' />
                <Skeleton className='w-1/3 h-5' />
                <Skeleton className='w-1/5 h-5' />
                <Skeleton className='w-1/2 h-5' />

                <div className="w-full flex items-center gap-x-3 my-2 ">
                  {Array.from({length: 5}).map((_, index) => {
                    return (
                      <Skeleton key={index} className="w-20 h-8" />
                    )
                  })}
                </div>
                {/* <BukuStats data={buku} /> */}
              </main>
            </section>

            <Separator className='my-4' />

            <section className='w-full'>
              <Skeleton className='w-1/5 h-5 mb-2' />
              <div className='w-full flex flex-col gap-y-2'>
                <Skeleton className='w-full h-4' />
                <Skeleton className='w-11/12 h-4' />
                <Skeleton className='w-9/12 h-4' />
                <Skeleton className='w-11/12 h-4' />
                <Skeleton className='w-12/12 h-4' />
                <Skeleton className='w-6/12 h-4' />
              </div>
            </section>

            <section className='flex gap-x-8 items-start my-2'>
                {/* profile section */}
                <section className="w-full my-2 rounded-lg bg-popover px-2 py-4">
                  <Skeleton className='w-1/3 h-5 mb-2' />
                  <main className="w-full flex flex-col gap-y-4 mt-4">
                    {Array.from({length: 4}).map((_, index) => {
                      return (
                        <section key={index} className="w-full flex items-center justify-between">
                          <Skeleton className='w-20 h-3' />
                          <Skeleton className='w-20 h-3' />
                        </section>
                      )
                    })}
                  </main>

                  <Skeleton className='w-full h-7 mt-4' />
                </section>

                {/* peminjaman section */}
                <section className="w-full my-2 rounded-lg bg-popover px-2 py-4">
                  <Skeleton className='w-1/3 h-5 mb-2' />
                  <main className="w-full flex flex-col gap-y-4 mt-4">
                    {Array.from({length: 7}).map((_, index) => {
                      return (
                        <section key={index} className="w-full flex items-center justify-between">
                          <Skeleton className='w-20 h-3' />
                          <Skeleton className='w-20 h-3' />
                        </section>
                      )
                    })}
                  </main>

                  <Skeleton className='w-full h-7 mt-4' />
                </section>
            </section>
          </section>

          {/* invoice */}
          <section className="rounded-2xl h-fit p-6 col-span-4 border">
            <Skeleton className='w-1/3 h-5 mb-2' />

            <main className='bg-popover rounded-lg p-4 my-4'>
              <main className='w-full flex items-center justify-between gap-x-4'>
                {Array.from({length: 2}).map((_, index) => {
                  return (
                    <div key={index} className='flex flex-col gap-y-1'>
                      <Skeleton className='w-1/4 h-5 mb-2' />
                      <Skeleton className='w-1/4 h-5 mb-2' />
                      <Skeleton className='w-1/4 h-5 mb-2' />
                      <Skeleton className='w-1/4 h-5 mb-2' />
                      <Skeleton className='w-1/4 h-5 mb-2' />
                      <Skeleton className='w-1/4 h-5 mb-2' />
                      <Skeleton className='w-1/4 h-5 mb-2' />
                    </div>
                  )
                })}
              </main>
            </main>

            <main className='w-full'>
              <Skeleton className='w-1/3 h-5 mb-2' />

              <div className='w-full flex flex-col gap-y-2 mt-2'>
                {Array.from({length: 3}).map((_, index) => {
                  return (
                    <div key={index} className='flex items-center justify-between'>
                      <Skeleton className='w-1/4 h-3' />
                      <Skeleton className='w-1/4 h-3' />
                    </div>
                  )
                })}
                <Separator />
                <div className='flex items-center justify-between text-lg font-bold text-primary'>
                  <Skeleton className='w-1/4 h-4' />
                  <Skeleton className='w-1/4 h-4' />
                </div>
                <Skeleton className='w-full h-7 mt-4' />
              </div>

            </main>

          </section>
        </main>
      </section>
    </section>
  )
}

export default DetailPengembalianLoadingPage