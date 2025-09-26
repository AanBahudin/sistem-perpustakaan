import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, KeyRound, MailPlus } from "lucide-react"
import { setEmailDialog, setPasswordDialog } from "@/cart/pustakawanProfilePageSlice"
import { store } from "@/store"
import EditEmailDialog from "./EditEmailDialog"
import EditPasswordDialog from "./EditPasswordDialog"

const ProfileDropDown = ({profil} : {profil: any}) => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <main className="w-8 absolute h-8 rounded-full hover:bg-accent/40 p-2 flex items-center justify-center top-4 right-4">
                        <EllipsisVertical className="stroke-black dark:stroke-white" />
                    </main>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56" align="start">

                    <DropdownMenuItem className="text-xs" onSelect={() => store.dispatch(setEmailDialog(true))}>
                        <MailPlus className="mr-2 h-4 w-4" />
                        Ubah Email
                    </DropdownMenuItem>

                    
                     <DropdownMenuItem className="text-xs" onSelect={() => store.dispatch(setPasswordDialog(true))}>
                        <KeyRound className="mr-2 w-2 h-2" />
                        Ubah Password
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <EditEmailDialog profile={profil} />
            <EditPasswordDialog />
        </>
    )
}

export default ProfileDropDown