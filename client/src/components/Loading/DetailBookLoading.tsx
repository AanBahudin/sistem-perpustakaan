import Container from "@/globals/Container"
import { Skeleton } from "../ui/skeleton"
import { Separator } from "../ui/separator"

const DetailBookLoading = () => {
  return (
    <Container className="my-20">
      <section className="w-[80%] mx-auto">
            <Skeleton className="w-1/3 h-5" />

            <main className="w-full flex my-10 gap-x-10">
                <Skeleton className="w-[400px] h-[400px]" />

                <div className="flex flex-1 justify-start flex-col">
                    <div className="w-full flex justify-between items-center">
                      <Skeleton className="h-8 w-2/3" />
                      <Skeleton className="w-1/4 h-8" />
                    </div>

                    <Skeleton className="w-5/6 h-4 my-2" />

                    <div className="w-full flex items-center gap-x-10 my-2 ">
                      {Array.from({length: 5}).map((_, index: number) => {
                        return (
                          <div key={index} className="w-full flex-1">
                            <Skeleton className="w-full h-6" />
                            <Separator orientation="vertical" />
                          </div>
                        )
                      })}
                    </div>

                    <Skeleton className="w-full h-6 mt-6" />
                    <Skeleton className="w-5/6 h-6 mt-2" />
                    <Skeleton className="w-full h-6 mt-2" />
                    <Skeleton className="w-4/6 h-6 mt-2 mb-6" />

                    <div className="flex w-full items-center justify-start gap-x-4">
                      {Array.from({length: 3}).map((_, index:number) => {
                        return (
                          <Skeleton key={index} className="w-1/2 h-8" />
                        )
                      })}

                    </div>

                    <Separator className="w-full my-4" />

                    <section className="w-full py-4 px-2 text-sm rounded-xl flex gap-4 items-center justify-between">
                      <main className="w-full flex flex-col gap-y-2">
                        <div className="w-full grid grid-cols-2 gap-x-2">
                          <Skeleton className="w-full h-5" />
                          <Skeleton className="w-full h-5"/>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                          <Skeleton className="w-full h-5"/>
                          <Skeleton className="w-2/3 h-5"/>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                          <Skeleton className="w-full h-5"/>
                          <Skeleton className="w-full h-5"/>
                        </div>
                      </main>

                      <main className="w-full flex flex-col gap-y-2">
                        <div className="w-full grid grid-cols-2 gap-x-2">
                          <Skeleton className="w-full h-5" />
                          <Skeleton className="w-full h-5"/>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                          <Skeleton className="w-full h-5"/>
                          <Skeleton className="w-2/3 h-5"/>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                          <Skeleton className="w-full h-5"/>
                          <Skeleton className="w-2/3 h-5"/>
                        </div>
                      </main>
                    </section>
                </div>
            </main>
        </section>
    </Container>
  )
}

export default DetailBookLoading