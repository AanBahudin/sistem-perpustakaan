import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/globals/Container"


const DetailPenggunaLoading = () => {
  return (
    <Container className="w-full">
        <Skeleton className="w-1/3 h-6 mb-6" />

        <section className="w-full min-h-[40vh] flex justify-start items-stretch  gap-x-4">
            <Skeleton className="w-[30%] rounded-2xl h-[40vh] " />
            <Skeleton className="flex-1 rounded-2xl h-[40vh] " />
            <Skeleton className="lex-1 rounded-xl h-[40vh] " />
        </section>

        <section className="w-full h-[60vh] my-6 flex items-center justify-start gap-x-4">
            <Skeleton className="w-[70%] h-full" />

            <section className="flex-1 h-full flex flex-col items-start justify-stretch gap-y-4">
                <Skeleton className="w-full h-[25vh]" />
                <Skeleton className="w-full h-[25vh]" />
            </section>
        </section>
    </Container>
  )
}

export default DetailPenggunaLoading