import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const PustakawanBerandaWelcomeSign = () => {
  return (
    <section className='w-full rounded-2xl bg-primary/30 min-h-[25vh] flex justify-center flex-col py-3 px-6'>
        <h1 className='text-white font-semibold text-2xl'>Hallo, Pustakawan 1👋</h1>
        <p className='text-xs mt-4 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates magnam velit maxime incidunt cum quisquam deserunt pariatur minima excepturi temporibus, eveniet ullam architecto commodi quas adipisci fugiat rerum molestias suscipit! </p>

        <Button size='sm' className='w-[20%] text-xs mt-5 font-normal border text-white bg-transparent' asChild >
            <Link to={'/pustakawan/pengajuan'}>Lihat</Link>
        </Button>
    </section>
  )
}

export default PustakawanBerandaWelcomeSign