import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/globals/Container"

const BerandaLoading = () => {
  return (
    <Container className="w-full min-h-[100vh] flex gap-x-6">
        {/* LEFT SIDE */}
        <section className="w-[60%] flex flex-col items-start">
            <Skeleton className="w-full rounded-2xl h-[25vh]" />
            <main className="w-full my-8">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                    {Array.from({length: 4}).map((_, index: number) => {
                        return (
                            <Skeleton key={index} className="col-span-1 rounded-xl min-h-[13vh]" />
                        )
                    })}
                </div>
            </main>
            <Skeleton className="w-full rounded-2xl min-h-[40vh]" />
        </section>

        {/* RIGHT SIDE */}
        <section className="flex-1 h-fit flex flex-col items-center">
            <main className="w-full flex gap-x-2 min-h-fit">
                <Skeleton className="flex-1 h-[35vh]" />
                <Skeleton className="flex-1 h-[35vh]" />
            </main>

            <Skeleton className="rounded-2xl h-[60vh] w-full my-6" />
        </section>
    </Container>
  )
}

export default BerandaLoading