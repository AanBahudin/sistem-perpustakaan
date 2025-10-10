import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/globals/Container"


const PengaturanSectionLoading = () => {
  return (
    <Container className="w-full my-6 min-h-[80vh]">
        <Skeleton className="w-1/2 h-8 mt-10 rounded" />
        <Skeleton className="w-[80%] h-5 mt-3 rounded" />
        <Skeleton className="w-[78%] h-5 mt-3 rounded" />

        <section className="w-full flex flex-col items-center justify-start gap-y-4 mt-10">
            <Skeleton className="w-full h-12 rounded" />
            <Skeleton className="w-full h-12 rounded" />
            <Skeleton className="w-full h-12 rounded" />

        </section>
    </Container>
  )
}

export default PengaturanSectionLoading