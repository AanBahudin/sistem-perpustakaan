import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"

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
                <DropdownMenuItem>Login</DropdownMenuItem>
                <DropdownMenuItem>Register</DropdownMenuItem>
            </DropdownMenuGroup>
            
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default NavbarPenggunaDropdown