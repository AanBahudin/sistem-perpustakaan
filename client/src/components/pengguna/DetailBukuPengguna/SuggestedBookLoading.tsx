import { Skeleton } from "@/components/ui/skeleton"

const SuggestedBookLoading = () => {
  return (
    <section className="w-full">
        <main className="w-full grid grid-cols-6 justify-items-stretch gap-y-4 my-6">
            {Array.from({length: 12}).map((_, index: number) => {
                return (
                    <Skeleton key={index} className="w-48 rounded h-52" />
                )
            })}
        </main>
    </section>
  )
}

export default SuggestedBookLoading