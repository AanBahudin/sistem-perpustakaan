import { Pen } from "lucide-react"
import { Link } from "react-router-dom"

const ProfilContainer = () => {
  return (
    <div className="flex gap-x-10 w-full items-center">
        <div className="w-12 h-12 rounded-full bg-muted"></div>
        <main>
            <h2 className="font-semibold">Aan Bahudin</h2>
            <div className="flex gap-x-4 items-center mt-1">
                <Pen className="stroke-muted-foreground" size={18} />
                <Link to='/user/profil' className="text-sm text-muted-foreground hover:underline">Ubah profil</Link>
            </div>
        </main>
    </div>
  )
}

export default ProfilContainer