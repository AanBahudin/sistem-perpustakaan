import { Input } from "../ui/input"

const NavSearch = () => {
  return (
    <div>
        <Input className="w-[500px] hidden md:block selection:text-white" placeholder="Cari sesuatu..." />
    </div>
  )
}

export default NavSearch