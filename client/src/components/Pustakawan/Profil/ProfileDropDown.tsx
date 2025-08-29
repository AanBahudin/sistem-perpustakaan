import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, KeyRound, MailPlus } from "lucide-react"

const ProfileDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <main className="w-8 absolute h-8 rounded-full hover:bg-accent/40 p-2 flex items-center justify-center top-4 right-4">
            <EllipsisVertical className="stroke-white" />
        </main>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem className='flex items-center gap-x-2 text-xs p-2'>
            <MailPlus />
            Ubah Email
            </DropdownMenuItem>
        <DropdownMenuItem className='flex items-center gap-x-2 text-xs p-2'>
            <KeyRound className="w-2 h-2" />
            Ubah Password
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropDown