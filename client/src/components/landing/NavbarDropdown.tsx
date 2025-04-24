import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"


const NavbarDropdown = () => {
  return (
    <div className="lg:hidden">
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

export default NavbarDropdown