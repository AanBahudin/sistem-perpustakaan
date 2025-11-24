import {logoutPenggunaAction} from "@/actions/Pengguna/Auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { penggunaNavbarLink } from "@/utils/links"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader, Menu } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const NavbarPenggunaDropdown = () => {

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: logoutPenggunaAction,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/login')
    },
    onError: () => {
      toast('Terjadi Kesalahan', {description: 'Tidak dapat logout, coba lagi'})
    }
  })

  const isLoading : boolean = mutation.isPending

  return (
    <div className="">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">
                <Menu />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-46">
            <DropdownMenuGroup>
              {penggunaNavbarLink.map((item, index) => {
                return (
                  <DropdownMenuItem asChild key={index}>
                    <Link key={index} to={item.url}>{item.title}</Link>
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuItem>
                <Button 
                  disabled={isLoading} onClick={() => mutation.mutate()}
                  className=" text-white w-full flex items-center justify-center text-xs gap-x-4" size={'sm'}>
                  {isLoading ? 'Keluar' : 'Logout'}
                  {isLoading && <Loader className="animate-spin w-5 h-5" />}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default NavbarPenggunaDropdown