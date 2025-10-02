import { BookOpenText } from "lucide-react"

const SearchLoading = () => {
  return (
    <section className='w-full h-[80vh] flex flex-col gap-y-3 items-center justify-center'>
        <main className='w-16 h-16 rounded-xl bg-primary flex items-center justify-center animate-pulse'>
            <BookOpenText className="text-white w-8 h-8" />
        </main>
        <p className="animate-bounce">Loading</p>
    </section>
  )
}

export default SearchLoading