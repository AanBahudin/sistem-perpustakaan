import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/globals/Container"

const PustakawanLoading = () => {
  return (
    <Container className="flex w-full flex-col">
        <Skeleton className="w-1/3 h-6" />
        {/* BAGIAN MAIN PROFILE */}
        <section className="w-full flex items-start justify-start gap-x-6 my-6">
            <Skeleton className="w-[30%] min-h-[40vh] rounded-2xl" />
            <Skeleton className="flex-1 min-h-[40vh] rounded-2xl" />
        </section>

        <section className="w-full my-4 flex flex-col gap-y-4">
            <Skeleton className="w-full border rounded-2xl min-h-[40vh]" />
            <Skeleton className="w-full border rounded-2xl min-h-[40vh]" />
            <Skeleton className="w-full border rounded-2xl min-h-[40vh]" />
            <Skeleton className="w-full border rounded-2xl min-h-[40vh]" />
        </section>
    </Container>
  )
}

export default PustakawanLoading