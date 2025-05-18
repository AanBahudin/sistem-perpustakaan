import { logoutAction } from "@/actions/authActions"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { penggunaNavbarLink } from "@/utils/links"
import { Menu } from "lucide-react"
import { Link } from "react-router-dom"

const NavbarPenggunaDropdown = () => {
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
                <Button className="text-sm text-white w-full" size={'sm'} onClick={logoutAction}>Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default NavbarPenggunaDropdown