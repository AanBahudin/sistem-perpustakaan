import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const PinjamanTerakhir = () => {
  return (
    <div className='w-3/5 h-[350px] bg-card rounded-xl border p-4'>
        <h3 className="font-semibold">Terakhir Dipinjam</h3>

        <main className='w-full h-full mt-8'>

          <div className="w-full h-[250px] flex gap-x-4">
            <img className="w-40 h-full object-fill rounded" src="https://res.cloudinary.com/dhthnjizr/image/upload/v1746458439/eeerieu4ivgzsylylaaj.jpg" alt="" />

            <main>
              <h1 className="font-semibold text-2xl">Clean Code</h1>
              <h4 className="text-sm bg-muted text-center py-1 px-4 rounded w-fit mt-2 mb-4">Teknologi Informasi</h4>
              <p className="text-sm text-muted-foreground mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quibusdam? Provident iste saepe ipsam odio dignissimos aliquam ducimus blanditiis ad?</p>

              <div className="flex gap-x-4 items-center justify-start">
                <Calendar className="stroke-muted-foreground w-5 h-5" />
                <p className="text-muted-foreground text-sm my-4">16 Mei 2024 - 30 Juli 2024</p>
              </div>

              <Button asChild size='sm' className="text-sm bg-primary-foreground">
                <Link to="/pengembalian" className="text-sm text-white w-full">Detail</Link>
              </Button>
            </main>
          </div>
        </main>


    </div>
  )
}

export default PinjamanTerakhir