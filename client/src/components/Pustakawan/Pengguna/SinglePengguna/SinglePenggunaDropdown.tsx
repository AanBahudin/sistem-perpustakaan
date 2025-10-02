import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Ban } from 'lucide-react'

const SinglePenggunaDropdown = ({children} : {children: React.ReactNode}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem className='flex items-center gap-x-2 text-xs text-destructive/90 p-2'><Ban className='w-3 h-3 stroke-destructive' /> Blokir Pengguna</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SinglePenggunaDropdown