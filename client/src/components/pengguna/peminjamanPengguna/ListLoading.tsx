import { Skeleton } from "@/components/ui/skeleton"


const ListLoading = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {Array.from({length: 6}).map((_, index) => {
          return (
              <section key={index} className="w-full h-full col-span-12 border rounded-2xl flex gap-x-4 p-4 hover:shadow-2xl duration-200 ease-in-out group">
                  <Skeleton className="w-24 h-24 object-fill rounded" />
                  <div className="w-full flex flex-col items-start justify-stretch ">
                    <div className="w-full flex items-center justify-between">
                        <Skeleton className="w-1/2 h-8" />
                        <Skeleton className="w-10 h-4" />
                    </div>

                    <div className="w-full flex items-center justify-between mt-4">
                        <main className="w-full flex flex-col gap-y-2">
                        <Skeleton className="w-2/3 h-4" />
                        <Skeleton className="w-1/3 h-4" />
                        </main>
                        <main className=" pl-20 self-center flex items-start flex-col justify-center w-1/3">
                    
                        </main>
                    </div>
                  </div>
              </section>
          )
      })}
    </div>
  )
}

export default ListLoading